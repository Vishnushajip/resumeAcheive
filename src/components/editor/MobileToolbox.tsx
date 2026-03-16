"use client";

import React, { useState } from "react";
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
  Sparkles,
  X,
  ChevronUp,
  Minus,
  Plus as PlusIcon,
} from "lucide-react";
import { TextFormat } from "@/hooks/useEditor";

interface MobileToolboxProps {
  isOpen: boolean;
  onClose: () => void;
  textFormat: TextFormat;
  applyToSelection: (format: Partial<TextFormat>) => void;
  onAddSection: (type: string) => void;
  onDeleteElement: () => void;
  onOpenAI: () => void;
  hasSelection: boolean;
}

const FONT_SIZES = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "32px",
];

const COLORS = [
  "#1f2937",
  "#374151",
  "#6b7280",
  "#dc2626",
  "#ea580c",
  "#d97706",
  "#16a34a",
  "#0891b2",
  "#2563eb",
  "#4f46e5",
  "#7c3aed",
  "#db2777",
  "#ffffff",
  "#000000",
];

export function MobileToolbox({
  isOpen,
  onClose,
  textFormat,
  applyToSelection,
  onAddSection,
  onDeleteElement,
  onOpenAI,
  hasSelection,
}: MobileToolboxProps) {
  const [activeTab, setActiveTab] = useState<
    "format" | "style" | "color" | "add"
  >("format");

  if (!isOpen) {
    return (
      <button
        onClick={() => {}}
        className="fixed bottom-4 right-4 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg"
      >
        <Type className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div className="flex-1 bg-black/50" onClick={onClose} />

      {/* Bottom Sheet */}
      <div className="bg-white rounded-t-2xl shadow-2xl max-h-[80vh] overflow-hidden">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h3 className="font-semibold">Edit</h3>
          <button onClick={onClose} className="p-2">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* AI Button - Always visible on mobile */}
        <div className="px-4 py-3 border-b bg-gradient-to-r from-purple-50 to-blue-50">
          <button
            onClick={() => {
              onClose();
              onOpenAI();
            }}
            className="w-full flex items-center justify-center gap-2 p-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg shadow-purple-500/30 active:scale-95 transition-all"
          >
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">Ask AI to Improve</span>
          </button>
          <p className="text-center text-xs text-gray-500 mt-2">
            Select text first, then tap to enhance with AI
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b overflow-x-auto">
          {[
            { id: "format", label: "Format", icon: Type },
            { id: "style", label: "Style", icon: Bold },
            { id: "color", label: "Color", icon: Palette },
            { id: "add", label: "Add", icon: Plus },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-1 py-3 px-4 text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[50vh]">
          {activeTab === "format" && (
            <div className="space-y-4">
              {/* Font Size */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Size
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const idx = FONT_SIZES.indexOf(textFormat.fontSize);
                      if (idx > 0)
                        applyToSelection({ fontSize: FONT_SIZES[idx - 1] });
                    }}
                    className="p-3 bg-gray-100 rounded-lg"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex-1 text-center font-medium">
                    {textFormat.fontSize}
                  </span>
                  <button
                    onClick={() => {
                      const idx = FONT_SIZES.indexOf(textFormat.fontSize);
                      if (idx < FONT_SIZES.length - 1)
                        applyToSelection({ fontSize: FONT_SIZES[idx + 1] });
                    }}
                    className="p-3 bg-gray-100 rounded-lg"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Alignment */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Align
                </label>
                <div className="flex gap-2">
                  {["left", "center", "right"].map((align) => (
                    <button
                      key={align}
                      onClick={() => applyToSelection({ textAlign: align })}
                      className={`flex-1 p-3 rounded-lg border ${
                        textFormat.textAlign === align
                          ? "bg-gray-100 border-gray-300"
                          : ""
                      }`}
                    >
                      {align === "left" && (
                        <AlignLeft className="h-5 w-5 mx-auto" />
                      )}
                      {align === "center" && (
                        <AlignCenter className="h-5 w-5 mx-auto" />
                      )}
                      {align === "right" && (
                        <AlignRight className="h-5 w-5 mx-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "style" && (
            <div className="space-y-4">
              {/* Bold, Italic, Underline */}
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    applyToSelection({
                      fontWeight:
                        textFormat.fontWeight === "bold" ? "normal" : "bold",
                    })
                  }
                  className={`flex-1 p-4 rounded-xl border ${textFormat.fontWeight === "bold" ? "bg-gray-100" : ""}`}
                >
                  <Bold className="h-6 w-6 mx-auto mb-1" />
                  <span className="text-xs">Bold</span>
                </button>
                <button
                  onClick={() =>
                    applyToSelection({
                      fontStyle:
                        textFormat.fontStyle === "italic" ? "normal" : "italic",
                    })
                  }
                  className={`flex-1 p-4 rounded-xl border ${textFormat.fontStyle === "italic" ? "bg-gray-100" : ""}`}
                >
                  <Italic className="h-6 w-6 mx-auto mb-1" />
                  <span className="text-xs">Italic</span>
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
                  className={`flex-1 p-4 rounded-xl border ${textFormat.textDecoration === "underline" ? "bg-gray-100" : ""}`}
                >
                  <Underline className="h-6 w-6 mx-auto mb-1" />
                  <span className="text-xs">Underline</span>
                </button>
              </div>

              {/* Delete */}
              <button
                onClick={() => {
                  onDeleteElement();
                  onClose();
                }}
                className="w-full p-4 border border-red-200 text-red-600 rounded-xl flex items-center justify-center gap-2"
              >
                <Trash2 className="h-5 w-5" />
                Delete Selected
              </button>
            </div>
          )}

          {activeTab === "color" && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Text Color
              </label>
              <div className="grid grid-cols-7 gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => applyToSelection({ color })}
                    className="aspect-square rounded-lg border-2 border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === "add" && (
            <div className="space-y-2">
              {[
                "Professional Summary",
                "Experience",
                "Education",
                "Skills",
                "Projects",
              ].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    onAddSection(section);
                    onClose();
                  }}
                  className="w-full p-4 rounded-xl border hover:bg-gray-50 text-left flex items-center gap-3"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Plus className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium">{section}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
