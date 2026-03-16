"use client";

import React from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { templates, TemplateType } from "@/lib/templates";

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentTemplate: TemplateType;
  onSelect: (template: TemplateType) => void;
}

const CATEGORIES = [
  { id: "all", label: "All Templates" },
  { id: "professional", label: "Professional" },
  { id: "modern", label: "Modern" },
  { id: "creative", label: "Creative" },
  { id: "industry", label: "Industry" },
];

export function TemplateSelector({
  isOpen,
  onClose,
  currentTemplate,
  onSelect,
}: TemplateSelectorProps) {
  const [activeCategory, setActiveCategory] = React.useState("all");

  const filteredTemplates = Object.values(templates).filter((template) =>
    activeCategory === "all" ? true : template.category === activeCategory,
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Choose a Template</h3>
            <p className="text-sm text-gray-500">
              Select a design that best represents your professional style
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="border-b px-6 py-3 overflow-x-auto">
          <div className="flex gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => onSelect(template.id)}
                className={`group relative rounded-xl border-2 p-4 text-left transition-all hover:shadow-lg ${
                  currentTemplate === template.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Preview */}
                <div
                  className="h-32 rounded-lg mb-3 overflow-hidden"
                  style={{
                    background: template.colors.background,
                    fontFamily: template.fonts.body,
                  }}
                >
                  <div
                    className="h-full p-3"
                    style={{
                      background:
                        template.layout.headerStyle === "banner"
                          ? template.colors.headerBg
                          : template.layout.headerStyle === "sidebar"
                            ? `linear-gradient(to right, ${template.colors.sidebarBg} 30%, ${template.colors.background} 30%)`
                            : template.colors.background,
                    }}
                  >
                    <div
                      className="text-xs font-bold mb-1"
                      style={{
                        color:
                          template.layout.headerStyle === "banner"
                            ? "#ffffff"
                            : template.colors.primary,
                      }}
                    >
                      Your Name
                    </div>
                    <div
                      className="text-[8px] mb-2"
                      style={{
                        color:
                          template.layout.headerStyle === "banner"
                            ? "rgba(255,255,255,0.8)"
                            : template.colors.secondary,
                      }}
                    >
                      Professional Title
                    </div>
                    <div
                      className="text-[6px] w-3/4 h-1 rounded mb-1"
                      style={{ background: template.colors.accent }}
                    />
                    <div
                      className="text-[6px] w-1/2 h-1 rounded"
                      style={{
                        background: template.colors.accent,
                        opacity: 0.5,
                      }}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {template.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                  {currentTemplate === template.id && (
                    <div className="bg-blue-500 text-white rounded-full p-1">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
