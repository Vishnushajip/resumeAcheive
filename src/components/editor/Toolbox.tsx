"use client";

import React from "react";
import {
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Plus,
  Trash2,
  Copy,
  Sparkles,
  ChevronDown,
  Minus,
  Plus as PlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TextFormat } from "@/hooks/useEditor";

interface ToolboxProps {
  textFormat: TextFormat;
  updateTextFormat: (format: Partial<TextFormat>) => void;
  applyToSelection: (format: Partial<TextFormat>) => void;
  onAddSection: (type: string) => void;
  onDeleteElement: () => void;
  onDuplicateElement: () => void;
  onOpenAI: () => void;
  hasSelection: boolean;
}

const FONT_FAMILIES = [
  { value: "Arial", label: "Arial" },
  { value: "Georgia", label: "Georgia" },
  { value: "'Times New Roman'", label: "Times New Roman" },
  { value: "'Helvetica Neue'", label: "Helvetica" },
  { value: "'Segoe UI'", label: "Segoe UI" },
  { value: "Verdana", label: "Verdana" },
  { value: "'Fira Code', monospace", label: "Monospace" },
  { value: "'Trebuchet MS'", label: "Trebuchet" },
];

const FONT_SIZES = [
  "8px",
  "9px",
  "10px",
  "11px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "28px",
  "32px",
  "36px",
  "48px",
  "72px",
];

const COLORS = [
  "#1f2937",
  "#374151",
  "#4b5563",
  "#6b7280",
  "#9ca3af",
  "#dc2626",
  "#ea580c",
  "#d97706",
  "#65a30d",
  "#16a34a",
  "#0891b2",
  "#2563eb",
  "#4f46e5",
  "#7c3aed",
  "#c026d3",
  "#db2777",
  "#e11d48",
  "#ffffff",
  "#f3f4f6",
  "#000000",
];

export function Toolbox({
  textFormat,
  updateTextFormat,
  applyToSelection,
  onAddSection,
  onDeleteElement,
  onDuplicateElement,
  onOpenAI,
  hasSelection,
}: ToolboxProps) {
  const [activeTab, setActiveTab] = React.useState<"text" | "section">("text");

  return (
    <div className="bg-white rounded-xl shadow-lg border w-72 max-h-[calc(100vh-200px)] overflow-y-auto">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("text")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "text"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Type className="h-4 w-4 inline mr-1" />
          Text
        </button>
        <button
          onClick={() => setActiveTab("section")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "section"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Plus className="h-4 w-4 inline mr-1" />
          Sections
        </button>
      </div>

      {activeTab === "text" ? (
        <div className="p-4 space-y-4">
          {/* AI Button */}
          {hasSelection && (
            <button
              onClick={onOpenAI}
              className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <Sparkles className="h-4 w-4" />
              Ask AI to Improve
            </button>
          )}

          {/* Font Family */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Font Family
            </label>
            <select
              value={textFormat.fontFamily}
              onChange={(e) => applyToSelection({ fontFamily: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
            >
              {FONT_FAMILIES.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Font Size
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const currentIndex = FONT_SIZES.indexOf(textFormat.fontSize);
                  if (currentIndex > 0) {
                    applyToSelection({
                      fontSize: FONT_SIZES[currentIndex - 1],
                    });
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Minus className="h-4 w-4" />
              </button>
              <select
                value={textFormat.fontSize}
                onChange={(e) => applyToSelection({ fontSize: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-lg text-sm bg-white text-center"
              >
                {FONT_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  const currentIndex = FONT_SIZES.indexOf(textFormat.fontSize);
                  if (currentIndex < FONT_SIZES.length - 1) {
                    applyToSelection({
                      fontSize: FONT_SIZES[currentIndex + 1],
                    });
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Font Style */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Style
            </label>
            <div className="flex gap-1">
              <button
                onClick={() =>
                  applyToSelection({
                    fontWeight:
                      textFormat.fontWeight === "bold" ? "normal" : "bold",
                  })
                }
                className={`flex-1 p-2 rounded-lg border transition-colors ${
                  textFormat.fontWeight === "bold"
                    ? "bg-gray-100 border-gray-300"
                    : "hover:bg-gray-50"
                }`}
              >
                <Bold className="h-4 w-4 mx-auto" />
              </button>
              <button
                onClick={() =>
                  applyToSelection({
                    fontStyle:
                      textFormat.fontStyle === "italic" ? "normal" : "italic",
                  })
                }
                className={`flex-1 p-2 rounded-lg border transition-colors ${
                  textFormat.fontStyle === "italic"
                    ? "bg-gray-100 border-gray-300"
                    : "hover:bg-gray-50"
                }`}
              >
                <Italic className="h-4 w-4 mx-auto" />
              </button>
              <button
                onClick={() =>
                  applyToSelection({
                    textDecoration:
                      textFormat.textDecoration === "underline"
                        ? "none"
                        : "underline",
                  })
                }
                className={`flex-1 p-2 rounded-lg border transition-colors ${
                  textFormat.textDecoration === "underline"
                    ? "bg-gray-100 border-gray-300"
                    : "hover:bg-gray-50"
                }`}
              >
                <Underline className="h-4 w-4 mx-auto" />
              </button>
            </div>
          </div>

          {/* Text Align */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Alignment
            </label>
            <div className="flex gap-1">
              <button
                onClick={() => applyToSelection({ textAlign: "left" })}
                className={`flex-1 p-2 rounded-lg border transition-colors ${
                  textFormat.textAlign === "left"
                    ? "bg-gray-100 border-gray-300"
                    : "hover:bg-gray-50"
                }`}
              >
                <AlignLeft className="h-4 w-4 mx-auto" />
              </button>
              <button
                onClick={() => applyToSelection({ textAlign: "center" })}
                className={`flex-1 p-2 rounded-lg border transition-colors ${
                  textFormat.textAlign === "center"
                    ? "bg-gray-100 border-gray-300"
                    : "hover:bg-gray-50"
                }`}
              >
                <AlignCenter className="h-4 w-4 mx-auto" />
              </button>
              <button
                onClick={() => applyToSelection({ textAlign: "right" })}
                className={`flex-1 p-2 rounded-lg border transition-colors ${
                  textFormat.textAlign === "right"
                    ? "bg-gray-100 border-gray-300"
                    : "hover:bg-gray-50"
                }`}
              >
                <AlignRight className="h-4 w-4 mx-auto" />
              </button>
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Color
            </label>
            <div className="grid grid-cols-5 gap-1">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => applyToSelection({ color })}
                  className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="border-t pt-4">
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Actions
            </label>
            <div className="flex gap-2">
              <button
                onClick={onDuplicateElement}
                className="flex-1 p-2 border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1 text-sm"
              >
                <Copy className="h-4 w-4" />
                Copy
              </button>
              <button
                onClick={onDeleteElement}
                className="flex-1 p-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center gap-1 text-sm"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-2">
          {[
            "Professional Summary",
            "Experience",
            "Education",
            "Skills",
            "Projects",
            "Certifications",
            "Awards",
          ].map((section) => (
            <button
              key={section}
              onClick={() => onAddSection(section)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="p-2 bg-blue-100 rounded-lg">
                <Plus className="h-4 w-4 text-blue-600" />
              </div>
              <span className="font-medium text-sm">{section}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
