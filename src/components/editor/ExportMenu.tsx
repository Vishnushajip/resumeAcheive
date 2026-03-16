"use client";

import React, { useState } from "react";
import {
  FileText,
  Image as ImageIcon,
  Download,
  Share2,
  Loader2,
  FileSpreadsheet,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

interface ExportMenuProps {
  resumeRef: React.RefObject<HTMLDivElement>;
  fileName: string;
  resumeData: any;
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
    id: "png",
    label: "PNG Image",
    description: "High quality image format",
    icon: ImageIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "jpg",
    label: "JPG Image",
    description: "Compressed image format",
    icon: ImageIcon,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: "json",
    label: "JSON Data",
    description: "Export raw data",
    icon: Code,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
];

export function ExportMenu({
  resumeRef,
  fileName,
  resumeData,
}: ExportMenuProps) {
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const exportToPDF = async () => {
    if (!resumeRef.current) return;

    setIsExporting("pdf");
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210;
      const pdfHeight = 297;

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${fileName}.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch {
      toast.error("Failed to export PDF");
    } finally {
      setIsExporting(null);
    }
  };

  const exportToImage = async (format: "png" | "jpg") => {
    if (!resumeRef.current) return;

    setIsExporting(format);
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

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

  const exportToJSON = () => {
    setIsExporting("json");
    try {
      const dataStr = JSON.stringify(resumeData, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.json`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("JSON exported successfully!");
    } catch {
      toast.error("Failed to export JSON");
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
      case "json":
        exportToJSON();
        break;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border p-4 w-72">
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
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left disabled:opacity-50"
            >
              <div className={`p-2 rounded-lg ${option.bgColor}`}>
                {isExporting === option.id ? (
                  <Loader2 className={`h-5 w-5 ${option.color} animate-spin`} />
                ) : (
                  <Icon className={`h-5 w-5 ${option.color}`} />
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-900">
                  {option.label}
                </div>
                <div className="text-xs text-gray-500">
                  {option.description}
                </div>
              </div>
              <Download className="h-4 w-4 text-gray-400" />
            </button>
          );
        })}
      </div>

      <div className="border-t mt-4 pt-4">
        <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
          <div className="p-2 rounded-lg bg-indigo-50">
            <Share2 className="h-5 w-5 text-indigo-500" />
          </div>
          <div>
            <div className="font-medium text-sm text-gray-900">Share Link</div>
            <div className="text-xs text-gray-500">Generate shareable URL</div>
          </div>
        </button>
      </div>
    </div>
  );
}
