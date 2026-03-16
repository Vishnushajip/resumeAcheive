"use client";

import React, { useState } from "react";
import { X, Check, Zap, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { templates, TemplateType, TemplateConfig } from "@/lib/templates";

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentTemplate: TemplateType;
  onSelect: (template: TemplateType) => void;
}

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "ats", label: "ATS Optimised" },
  { id: "professional", label: "Professional" },
  { id: "modern", label: "Modern" },
  { id: "creative", label: "Creative" },
];

function ATSBadge({ score }: { score: number }) {
  const color =
    score >= 95
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : score >= 85
        ? "bg-blue-50 text-blue-700 border-blue-200"
        : score >= 75
          ? "bg-amber-50 text-amber-700 border-amber-200"
          : "bg-gray-100 text-gray-600 border-gray-200";

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded border ${color}`}
    >
      <Shield className="h-2.5 w-2.5" />
      ATS {score}
    </span>
  );
}

function TemplatePreview({
  template,
  isSelected,
}: {
  template: TemplateConfig;
  isSelected: boolean;
}) {
  const isBanner = template.layout.headerStyle === "banner";
  const isSidebar = template.layout.headerStyle === "sidebar";
  const isCentered = template.layout.headerStyle === "centered";

  return (
    <div
      className={`relative rounded-lg overflow-hidden border-2 transition-all ${
        isSelected
          ? "border-blue-500"
          : "border-gray-200 group-hover:border-gray-300"
      }`}
      style={{ height: "148px", background: template.colors.background }}
    >
      {/* Sidebar layout */}
      {isSidebar ? (
        <div className="flex h-full">
          <div
            className="w-[38%] h-full p-2"
            style={{ background: template.colors.sidebarBg }}
          >
            <div
              className="w-6 h-6 rounded-full mb-2"
              style={{ background: template.colors.accent, opacity: 0.5 }}
            />
            <div
              className="h-1.5 w-10 rounded mb-1.5"
              style={{ background: template.colors.accent, opacity: 0.7 }}
            />
            <div
              className="h-1 w-8 rounded mb-3"
              style={{ background: template.colors.secondary, opacity: 0.4 }}
            />
            {["Skills", "Contact"].map((s) => (
              <div key={s} className="mb-2">
                <div
                  className="h-[5px] w-7 rounded mb-1"
                  style={{ background: template.colors.accent, opacity: 0.5 }}
                />
                <div
                  className="h-[4px] w-10 rounded mb-0.5"
                  style={{
                    background: template.colors.secondary,
                    opacity: 0.3,
                  }}
                />
                <div
                  className="h-[4px] w-8 rounded"
                  style={{
                    background: template.colors.secondary,
                    opacity: 0.2,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex-1 p-2">
            {["Experience", "Education"].map((s) => (
              <div key={s} className="mb-3">
                <div
                  className="h-[5px] w-14 rounded mb-1"
                  style={{ background: template.colors.text, opacity: 0.7 }}
                />
                <div
                  className="h-[3px] w-full rounded mb-0.5"
                  style={{ background: template.colors.text, opacity: 0.15 }}
                />
                <div
                  className="h-[3px] w-3/4 rounded mb-0.5"
                  style={{ background: template.colors.text, opacity: 0.1 }}
                />
                <div
                  className="h-[3px] w-5/6 rounded"
                  style={{ background: template.colors.text, opacity: 0.1 }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Header zone */}
          <div
            className="px-3 py-2"
            style={{
              background: isBanner
                ? template.colors.headerBg
                : template.colors.background,
              textAlign: isCentered ? "center" : "left",
            }}
          >
            <div
              className="h-2 w-20 rounded mb-1 mx-auto"
              style={{
                background: isBanner
                  ? "rgba(255,255,255,0.9)"
                  : template.colors.primary,
                marginLeft: isCentered ? "auto" : "0",
                marginRight: isCentered ? "auto" : "0",
              }}
            />
            <div
              className="h-1.5 w-14 rounded mb-1.5"
              style={{
                background: isBanner
                  ? "rgba(255,255,255,0.55)"
                  : template.colors.secondary,
                opacity: 0.7,
                marginLeft: isCentered ? "auto" : "0",
                marginRight: isCentered ? "auto" : "0",
              }}
            />
            <div
              className={`flex gap-1.5 ${isCentered ? "justify-center" : ""}`}
            >
              {[10, 12, 9].map((w, i) => (
                <div
                  key={i}
                  className="h-[4px] rounded"
                  style={{
                    width: `${w * 4}px`,
                    background: isBanner
                      ? "rgba(255,255,255,0.4)"
                      : template.colors.secondary,
                    opacity: 0.5,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          {template.layout.dividerStyle !== "none" && (
            <div
              className="mx-3 my-1"
              style={{
                height:
                  template.layout.dividerStyle === "thick" ? "2px" : "1px",
                background: template.colors.divider,
                borderStyle:
                  template.layout.dividerStyle === "dotted"
                    ? "dashed"
                    : "solid",
              }}
            />
          )}

          {/* Body */}
          <div className="flex-1 px-3 pb-2 space-y-2 overflow-hidden">
            {["Summary", "Experience", "Skills"].map((section) => (
              <div key={section}>
                <div className="flex items-center gap-1 mb-1">
                  <div
                    className="h-[5px] w-12 rounded"
                    style={{
                      background: template.colors.primary,
                      opacity: 0.8,
                    }}
                  />
                  {template.layout.dividerStyle === "line" && (
                    <div
                      className="flex-1 h-px"
                      style={{ background: template.colors.divider }}
                    />
                  )}
                </div>
                {section === "Skills" ? (
                  <div className="flex gap-1 flex-wrap">
                    {[16, 12, 18, 10].map((w, i) => (
                      <div
                        key={i}
                        className="h-[10px] rounded"
                        style={{
                          width: `${w * 3}px`,
                          background: template.colors.skillTag,
                          border: `0.5px solid ${template.colors.accent}30`,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    <div
                      className="h-[3px] w-full rounded"
                      style={{
                        background: template.colors.text,
                        opacity: 0.12,
                      }}
                    />
                    <div
                      className="h-[3px] w-4/5 rounded"
                      style={{
                        background: template.colors.text,
                        opacity: 0.08,
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected check */}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-0.5">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}
    </div>
  );
}

export function TemplateSelector({
  isOpen,
  onClose,
  currentTemplate,
  onSelect,
}: TemplateSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredTemplate, setHoveredTemplate] = useState<TemplateType | null>(
    null,
  );

  const filteredTemplates = Object.values(templates).filter((t) =>
    activeCategory === "all" ? true : t.category === activeCategory,
  );

  const atsCount = Object.values(templates).filter(
    (t) => t.atsScore >= 90,
  ).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b px-6 py-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Choose a template
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {atsCount} ATS-optimised templates — recommended for maximum
              recruiter reach
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors mt-0.5"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* ATS Banner */}
        <div className="mx-6 mt-4 mb-0 rounded-xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100 px-4 py-3 flex items-center gap-3">
          <div className="bg-emerald-100 rounded-lg p-1.5">
            <Zap className="h-4 w-4 text-emerald-700" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              ATS score = how well a template parses through automated screening
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Single-column layouts score highest. Two-column and creative
              templates may have reduced parse rates on some systems.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-6 pt-4 pb-0">
          <div className="flex gap-1.5 border-b border-gray-100">
            {CATEGORIES.map((cat) => {
              const count =
                cat.id === "all"
                  ? Object.values(templates).length
                  : Object.values(templates).filter(
                      (t) => t.category === cat.id,
                    ).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeCategory === cat.id
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {cat.label}
                  <span className="ml-1.5 text-xs text-gray-400">
                    ({count})
                  </span>
                  {activeCategory === cat.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTemplates.map((template) => {
              const isSelected = currentTemplate === template.id;
              const isHovered = hoveredTemplate === template.id;

              return (
                <button
                  key={template.id}
                  onClick={() => onSelect(template.id)}
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                  className={`group relative text-left rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isSelected
                      ? "ring-2 ring-blue-500"
                      : "hover:ring-1 hover:ring-gray-300"
                  }`}
                >
                  <TemplatePreview
                    template={template}
                    isSelected={isSelected}
                  />

                  {/* Info row */}
                  <div className="pt-2 pb-1 px-0.5">
                    <div className="flex items-start justify-between gap-1 mb-0.5">
                      <h4 className="text-sm font-medium text-gray-900 leading-tight">
                        {template.name}
                      </h4>
                      <ATSBadge score={template.atsScore} />
                    </div>
                    <p className="text-[11px] text-gray-400 leading-snug line-clamp-2">
                      {template.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {template.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover overlay with Apply button */}
                  {isHovered && !isSelected && (
                    <div className="absolute inset-0 rounded-xl bg-blue-500/5 flex items-center justify-center pointer-events-none">
                      <div className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg">
                        Apply template
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-3 flex items-center justify-between bg-gray-50 rounded-b-2xl">
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            <Star className="h-3 w-3 text-amber-400" />
            Currently using:{" "}
            <span className="font-medium text-gray-600">
              {templates[currentTemplate]?.name ?? currentTemplate}
            </span>
            <ATSBadge score={templates[currentTemplate]?.atsScore ?? 0} />
          </p>
          <Button variant="outline" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
