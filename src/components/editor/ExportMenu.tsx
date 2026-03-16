"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  FileText,
  Image as ImageIcon,
  Download,
  Share2,
  Loader2,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

interface ExportMenuProps {
  resumeRef: React.RefObject<HTMLDivElement>;
  fileName: string;
  resumeData: any;
  onClose: () => void;
}

const EXPORT_OPTIONS = [
  {
    id: "pdf",
    label: "PDF Document",
    description: "Best for printing and sharing",
    icon: FileText,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    id: "docx",
    label: "Word Document",
    description: "Editable DOC format",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "png",
    label: "PNG Image",
    description: "High quality image format",
    icon: ImageIcon,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: "jpg",
    label: "JPG Image",
    description: "Compressed image format",
    icon: ImageIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
];

function safeColor(value: string): string {
  try {
    const c = document.createElement("canvas");
    c.width = c.height = 1;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = value;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    if (a === 0) return "transparent";
    return `rgb(${r},${g},${b})`;
  } catch {
    return "#000000";
  }
}

async function captureCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  await document.fonts.ready;

  const wrapper = element.parentElement as HTMLElement;
  const originalTransform = wrapper?.style.transform ?? "";
  const originalTransformOrigin = wrapper?.style.transformOrigin ?? "";

  if (wrapper) {
    wrapper.style.transform = "scale(1)";
    wrapper.style.transformOrigin = "top center";
  }

  void element.offsetHeight;

  try {
    return await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: element.offsetWidth,
      height: element.offsetHeight,
      windowWidth: element.offsetWidth,
      windowHeight: element.offsetHeight,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc, clonedEl) => {
        const unsupported = /\b(lab|oklch|lch|oklab|color)\s*\(/gi;

        const rootComputed = window.getComputedStyle(document.documentElement);
        const clonedRoot = clonedDoc.documentElement;
        Array.from(rootComputed).forEach((prop) => {
          if (prop.startsWith("--")) {
            const val = rootComputed.getPropertyValue(prop).trim();
            unsupported.lastIndex = 0;
            if (unsupported.test(val)) {
              unsupported.lastIndex = 0;
              clonedRoot.style.setProperty(prop, safeColor(val));
            }
          }
        });

        const colorProps = [
          "color",
          "backgroundColor",
          "borderColor",
          "borderTopColor",
          "borderRightColor",
          "borderBottomColor",
          "borderLeftColor",
          "outlineColor",
          "boxShadow",
          "textDecorationColor",
        ] as const;

        clonedEl.querySelectorAll<HTMLElement>("*").forEach((el) => {
          colorProps.forEach((prop) => {
            const val = el.style[prop as any] as string;
            if (val) {
              unsupported.lastIndex = 0;
              if (unsupported.test(val)) {
                unsupported.lastIndex = 0;
                el.style[prop as any] = safeColor(val);
              }
            }
          });
        });

        const clonedWrapper = clonedEl.parentElement as HTMLElement;
        if (clonedWrapper) {
          clonedWrapper.style.transform = "none";
          clonedWrapper.style.transformOrigin = "unset";
        }
        clonedEl.style.transform = "none";

        const link = clonedDoc.createElement("link");
        link.rel = "stylesheet";
        link.href =
          "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap";
        clonedDoc.head.appendChild(link);
      },
    });
  } finally {
    if (wrapper) {
      wrapper.style.transform = originalTransform;
      wrapper.style.transformOrigin = originalTransformOrigin;
    }
  }
}

export function ExportMenu({
  resumeRef,
  fileName,
  resumeData,
  onClose,
}: ExportMenuProps) {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const exportToPDF = async () => {
    if (!resumeRef.current) return;
    setIsExporting("pdf");
    try {
      const element = resumeRef.current;
      const canvas = await captureCanvas(element);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const cssToMm = 25.4 / 96;
      const contentWidthMm = element.offsetWidth * cssToMm;
      const contentHeightMm = element.offsetHeight * cssToMm;

      const fitScale = Math.min(
        pageWidth / contentWidthMm,
        pageHeight / contentHeightMm,
      );

      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        pageWidth,
        contentHeightMm * fitScale,
      );

      pdf.save(`${fileName}.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export PDF");
    } finally {
      setIsExporting(null);
    }
  };

  const exportToImage = async (format: "png" | "jpg") => {
    if (!resumeRef.current) return;
    setIsExporting(format);
    try {
      const canvas = await captureCanvas(resumeRef.current);
      const link = document.createElement("a");
      link.download = `${fileName}.${format}`;
      link.href = canvas.toDataURL(
        format === "jpg" ? "image/jpeg" : "image/png",
        0.95,
      );
      link.click();
      toast.success(`${format.toUpperCase()} downloaded successfully!`);
    } catch {
      toast.error(`Failed to export ${format.toUpperCase()}`);
    } finally {
      setIsExporting(null);
    }
  };

  const exportToDOCX = async () => {
    if (!resumeRef.current) return;
    setIsExporting("docx");
    try {
      const htmlContent = resumeRef.current.innerHTML;
      const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap">
  <style>
    body { font-family: 'DM Sans', Arial, sans-serif; line-height: 1.6; color: #333; margin: 40px; }
    h1 { font-family: 'Syne', Arial, sans-serif; font-size: 24px; margin-bottom: 8px; }
    h2 { font-size: 13px; text-transform: uppercase; border-bottom: 2px solid #333; padding-bottom: 4px; margin-top: 20px; }
    h3 { font-size: 14px; font-weight: bold; margin-bottom: 4px; }
    p  { margin: 4px 0; }
    ul { margin: 4px 0; padding-left: 20px; }
    li { margin: 2px 0; }
    span { margin-right: 8px; }
  </style>
</head>
<body>${htmlContent}</body>
</html>`;
      const blob = new Blob([fullHtml], { type: "application/msword" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.doc`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Word document downloaded!");
    } catch {
      toast.error("Failed to export Word document");
    } finally {
      setIsExporting(null);
    }
  };

  const handleExport = (format: string) => {
    switch (format) {
      case "pdf":
        exportToPDF();
        break;
      case "png":
        exportToImage("png");
        break;
      case "jpg":
        exportToImage("jpg");
        break;
      case "docx":
        exportToDOCX();
        break;
    }
  };

  const handleShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div
      ref={menuRef}
      className="bg-white rounded-xl shadow-lg border p-4 w-72"
    >
      <h4 className="font-semibold text-gray-900 mb-1">Export Resume</h4>
      <p className="text-sm text-gray-500 mb-4">Choose your preferred format</p>

      <div className="space-y-2">
        {EXPORT_OPTIONS.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => handleExport(option.id)}
              disabled={isExporting !== null}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className={`p-2 rounded-lg ${option.bgColor} flex-shrink-0`}>
                {isExporting === option.id ? (
                  <Loader2 className={`h-5 w-5 ${option.color} animate-spin`} />
                ) : (
                  <Icon className={`h-5 w-5 ${option.color}`} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-900">
                  {option.label}
                </div>
                <div className="text-xs text-gray-500">
                  {option.description}
                </div>
              </div>
              {isExporting === option.id ? (
                <span className="text-xs text-gray-400">Exporting…</span>
              ) : (
                <Download className="h-4 w-4 text-gray-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      <div className="border-t mt-4 pt-4">
        <button
          onClick={handleShareLink}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
        >
          <div className="p-2 rounded-lg bg-indigo-50 flex-shrink-0">
            <Share2 className="h-5 w-5 text-indigo-500" />
          </div>
          <div>
            <div className="font-medium text-sm text-gray-900">
              Copy Share Link
            </div>
            <div className="text-xs text-gray-500">Copy current page URL</div>
          </div>
        </button>
      </div>
    </div>
  );
}
