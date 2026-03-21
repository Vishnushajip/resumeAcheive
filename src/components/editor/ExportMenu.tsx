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

// Safely convert any color value (including oklab/oklch) to rgb using canvas
function toSafeRgb(value: string): string {
  if (!value || value === "transparent" || value === "none" || value === "")
    return value;
  if (/^(#[0-9a-f]{3,8}|rgb|rgba)/.test(value.trim())) return value; // already safe
  try {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#000"; // reset
    ctx.fillStyle = value;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    if (a === 0) return "transparent";
    if (a < 255) return `rgba(${r},${g},${b},${+(a / 255).toFixed(3)})`;
    return `rgb(${r},${g},${b})`;
  } catch {
    return "#000000";
  }
}

// Get a computed color and return it as safe rgb
function getSafeComputedColor(el: Element, prop: string): string | null {
  try {
    const val = window.getComputedStyle(el).getPropertyValue(prop).trim();
    if (!val || val === "" || val === "initial" || val === "inherit")
      return null;
    return toSafeRgb(val);
  } catch {
    return null;
  }
}

// Build a deep clone where every element has its computed colors force-inlined as safe rgb
function buildSafeClone(source: HTMLElement): HTMLElement {
  const clone = source.cloneNode(true) as HTMLElement;

  const srcAll = [
    source,
    ...Array.from(source.querySelectorAll<HTMLElement>("*")),
  ];
  const clnAll = [
    clone,
    ...Array.from(clone.querySelectorAll<HTMLElement>("*")),
  ];

  srcAll.forEach((src, i) => {
    const cln = clnAll[i] as HTMLElement;
    if (!cln || typeof cln.style === "undefined") return;

    const computed = window.getComputedStyle(src);

    // --- Aggressive Color Sanitation ---
    // List of all color-related properties
    const colorProps = [
      "color",
      "backgroundColor",
      "borderColor",
      "borderTopColor",
      "borderRightColor",
      "borderBottomColor",
      "borderLeftColor",
      "outlineColor",
      "stroke",
      "fill",
      "textDecorationColor",
      "caretColor",
    ];

    colorProps.forEach((prop) => {
      try {
        const val = (computed as any)[prop];
        if (
          val &&
          (val.includes("oklab") ||
            val.includes("oklch") ||
            val.includes("lch") ||
            val.includes("lab"))
        ) {
          (cln.style as any)[prop] = toSafeRgb(val);
        } else if (val && val !== "rgba(0, 0, 0, 0)" && val !== "transparent") {
          (cln.style as any)[prop] = val;
        }
      } catch {
        /* ignore */
      }
    });

    // --- Fix Box Shadows & Filters (common oklab/lab sources) ---
    ["boxShadow", "filter", "backdropFilter"].forEach((prop) => {
      try {
        const val = (computed as any)[prop];
        if (
          val &&
          val !== "none" &&
          (val.includes("oklab") ||
            val.includes("oklch") ||
            val.includes("lab") ||
            val.includes("lch"))
        ) {
          cln.style[prop as any] = "none";
        } else if (val && val !== "none") {
          cln.style[prop as any] = val;
        }
      } catch {
        /* ignore */
      }
    });

    // --- Typography & Layout props to preserve appearance exactly ---
    const layoutProps = [
      "fontFamily",
      "fontSize",
      "fontWeight",
      "fontStyle",
      "lineHeight",
      "letterSpacing",
      "textAlign",
      "textTransform",
      "textDecoration",
      "whiteSpace",
      "wordBreak",
      "display",
      "flexDirection",
      "flexWrap",
      "alignItems",
      "justifyContent",
      "gap",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "marginTop",
      "marginRight",
      "marginBottom",
      "marginLeft",
      "borderTopWidth",
      "borderRightWidth",
      "borderBottomWidth",
      "borderLeftWidth",
      "borderTopStyle",
      "borderRightStyle",
      "borderBottomStyle",
      "borderLeftStyle",
      "borderRadius",
    ];

    layoutProps.forEach((prop) => {
      try {
        const val = (computed as any)[prop];
        if (val && val !== "") (cln.style as any)[prop] = val;
      } catch {
        /* ignore */
      }
    });

    // --- CRITICAL: Remove all CSS Variables ---
    // Tailwind stores oklab/lab colors in variables which html2canvas tries to parse.
    // Since we've already inlined the computed values, we don't need them.
    const vars: string[] = [];
    for (let j = 0; j < cln.style.length; j++) {
      const propName = cln.style[j];
      if (propName.startsWith("--")) vars.push(propName);
    }
    vars.forEach((v) => cln.style.removeProperty(v));

    // Additional layout stability
    cln.style.boxSizing = "border-box";
    cln.style.maxWidth = "none";
    cln.style.transform = "none";
    cln.style.position =
      computed.position === "absolute" || computed.position === "fixed"
        ? computed.position
        : "relative";

    // Strip interactivity
    cln.removeAttribute("contenteditable");
    cln.style.userSelect = "none";
    cln.style.pointerEvents = "none";
  });

  // Remove any elements marked with data-no-export="true"
  clone.querySelectorAll('[data-no-export="true"]').forEach((el) => el.remove());

  return clone;
}

async function captureCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  // Ensure fonts are loaded before starting
  await document.fonts.ready;

  const wrapper = element.parentElement as HTMLElement;
  const originalTransform = wrapper?.style.transform ?? "";
  const originalTransformOrigin = wrapper?.style.transformOrigin ?? "";

  // Step 1: Temporarily remove transforms to measure real dimensions
  if (wrapper) {
    wrapper.style.transform = "none";
    wrapper.style.transformOrigin = "top left";
  }
  const originalMinHeight = element.style.minHeight;
  const originalHeight = element.style.height;
  element.style.minHeight = "0";
  element.style.height = "auto";

  // Trigger reflow
  await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 100)));

  const captureWidth = element.offsetWidth || 794;
  const captureHeight = element.offsetHeight;

  // Build the safe clone (this inlines computed styles as RGB)
  const safeClone = buildSafeClone(element);

  // Refine the clone for the iframe
  safeClone.style.width = `${captureWidth}px`;
  safeClone.style.height = "auto";
  safeClone.style.minHeight = "0";
  safeClone.style.margin = "0";
  safeClone.style.padding = window.getComputedStyle(element).padding;
  safeClone.style.boxSizing = "border-box";
  safeClone.style.backgroundColor = "#ffffff";
  safeClone.style.transform = "none";
  safeClone.style.position = "relative";
  safeClone.style.display = "block";

  // Restore original element styles immediately to minimize visual impact
  element.style.minHeight = originalMinHeight;
  element.style.height = originalHeight;
  if (wrapper) {
    wrapper.style.transform = originalTransform;
    wrapper.style.transformOrigin = originalTransformOrigin;
  }

  // Step 2: Create a hidden iframe for isolated rendering
  // This avoids the "unstyled text" flicker and "lab()" parsing errors
  const iframe = document.createElement("iframe");
  iframe.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: ${captureWidth}px;
    height: ${captureHeight}px;
    visibility: hidden;
    pointer-events: none;
    z-index: -9999;
    border: none;
  `;
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) {
    document.body.removeChild(iframe);
    throw new Error("Failed to create capture context");
  }

  // Set up the iframe's document
  iframeDoc.open();
  iframeDoc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap">
        <style>
          body { margin: 0; padding: 0; background: white; overflow: visible; -webkit-font-smoothing: antialiased; }
          * { box-sizing: border-box; }
        </style>
      </head>
      <body></body>
    </html>
  `);
  iframeDoc.close();

  // Wait for fonts in iframe
  await new Promise((r) => setTimeout(r, 150));

  // Inject the clone
  iframeDoc.body.appendChild(safeClone);

  // Trigger one last reflow in iframe
  const finalHeight = safeClone.offsetHeight;

  try {
    const canvas = await html2canvas(safeClone, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: "#ffffff",
      width: captureWidth,
      height: finalHeight,
      windowWidth: captureWidth,
      windowHeight: finalHeight,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
    });

    // Trim the bottom of the canvas if it's purely white
    const ctx = canvas.getContext("2d")!;
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let lastRowWithContent = canvas.height - 1;

    // Scan backwards from the bottom
    outerLoop: for (let y = canvas.height - 1; y >= 0; y--) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        // Check if pixel is not white (with a small tolerance)
        if (
          pixels.data[i] < 250 ||
          pixels.data[i + 1] < 250 ||
          pixels.data[i + 2] < 250
        ) {
          lastRowWithContent = y;
          break outerLoop;
        }
      }
    }

    if (lastRowWithContent < canvas.height - 10) {
      const trimmed = document.createElement("canvas");
      trimmed.width = canvas.width;
      trimmed.height = lastRowWithContent + 20; // Add 20px padding at bottom
      const tCtx = trimmed.getContext("2d")!;
      tCtx.drawImage(canvas, 0, 0);
      return trimmed;
    }

    return canvas;
  } finally {
    document.body.removeChild(iframe);
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
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const exportToPDF = async () => {
    if (!resumeRef.current) return;
    setIsExporting("pdf");
    try {
      const canvas = await captureCanvas(resumeRef.current);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidthMm = pdf.internal.pageSize.getWidth();
      const pageHeightMm = pdf.internal.pageSize.getHeight();
      const cw = canvas.width;
      const ch = canvas.height;
      const imgHeightMm = (ch / cw) * pageWidthMm;

      // Threshold (10mm) to ignore bottom padding/whitespace for single page
      if (imgHeightMm <= pageHeightMm + 10) {
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          pageWidthMm,
          Math.min(imgHeightMm, pageHeightMm),
        );
      } else {
        // Multi-page slicing logic
        const pageHeightPx = Math.floor((pageHeightMm / pageWidthMm) * cw);
        let yOffset = 0;
        let pageIdx = 0;

        while (yOffset < ch) {
          // Ignore small overflows on a new page (up to 10mm of potential white space)
          const remainingHeightMm = ((ch - yOffset) / cw) * pageWidthMm;
          if (pageIdx > 0 && remainingHeightMm < 10) break;

          if (pageIdx > 0) pdf.addPage();

          const sliceH = Math.min(pageHeightPx, ch - yOffset);
          const pc = document.createElement("canvas");
          pc.width = cw;
          pc.height = sliceH;
          const ctx = pc.getContext("2d")!;

          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, cw, sliceH);
          ctx.drawImage(canvas, 0, -yOffset, cw, ch);

          pdf.addImage(
            pc.toDataURL("image/png"),
            "PNG",
            0,
            0,
            pageWidthMm,
            (sliceH / cw) * pageWidthMm,
          );

          yOffset += sliceH;
          pageIdx++;
        }
      }

      pdf.save(`${fileName}.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error("PDF export error:", err);
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
<html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap">
<style>
  body { font-family: 'DM Sans', Arial, sans-serif; line-height: 1.6; color: #333; margin: 40px; }
  h1 { font-family: 'Syne', Arial, sans-serif; font-size: 24px; margin-bottom: 8px; }
  h2 { font-size: 13px; text-transform: uppercase; border-bottom: 2px solid #333; padding-bottom: 4px; margin-top: 20px; }
  h3 { font-size: 14px; font-weight: bold; margin-bottom: 4px; }
  p { margin: 4px 0; } ul { margin: 4px 0; padding-left: 20px; }
  li { margin: 2px 0; } span { margin-right: 8px; }
</style></head><body>${htmlContent}</body></html>`;
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
