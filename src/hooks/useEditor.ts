"use client";

import { useState, useCallback, useRef } from "react";
import { TemplateType, TemplateConfig } from "@/lib/templates";

export interface EditorState {
  selectedElement: HTMLElement | null;
  selectedText: string;
  currentTemplate: TemplateType;
  zoom: number;
  isMobile: boolean;
  showToolbox: boolean;
  showAiModal: boolean;
  showTemplateSelector: boolean;
  showExportMenu: boolean;
  editHistory: any[];
  historyIndex: number;
}

export interface TextFormat {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
  color: string;
  textAlign: string;
  lineHeight: string;
  letterSpacing: string;
  textDecoration: string;
}

export function useEditor() {
  const [state, setState] = useState<EditorState>({
    selectedElement: null,
    selectedText: "",
    currentTemplate: "ats-clean",
    zoom: 50,
    isMobile: false,
    showToolbox: false,
    showAiModal: false,
    showTemplateSelector: false,
    showExportMenu: false,
    editHistory: [],
    historyIndex: -1,
  });

  const [textFormat, setTextFormat] = useState<TextFormat>({
    fontFamily: "Arial",
    fontSize: "14px",
    fontWeight: "normal",
    fontStyle: "normal",
    color: "#1f2937",
    textAlign: "left",
    lineHeight: "1.6",
    letterSpacing: "0",
    textDecoration: "none",
  });

  const resumeRef = useRef<HTMLDivElement>(null);

  const setSelectedElement = useCallback((element: HTMLElement | null) => {
    setState((prev) => ({ ...prev, selectedElement: element }));
    if (element) {
      const computed = window.getComputedStyle(element);
      setTextFormat({
        fontFamily: computed.fontFamily.replace(/["']/g, "").split(",")[0],
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        fontStyle: computed.fontStyle,
        color: computed.color,
        textAlign: computed.textAlign,
        lineHeight: computed.lineHeight,
        letterSpacing: computed.letterSpacing,
        textDecoration: computed.textDecoration,
      });
    }
  }, []);

  const updateTextFormat = useCallback(
    (format: Partial<TextFormat>) => {
      setTextFormat((prev) => ({ ...prev, ...format }));
      if (state.selectedElement) {
        Object.entries(format).forEach(([key, value]) => {
          if (value !== undefined) {
            state.selectedElement!.style[key as any] = value;
          }
        });
      }
    },
    [state.selectedElement],
  );

  const applyToSelection = useCallback((format: Partial<TextFormat>) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (!selectedText) return;

    const span = document.createElement("span");
    Object.entries(format).forEach(([key, value]) => {
      if (value !== undefined) {
        span.style[key as any] = value;
      }
    });

    try {
      range.surroundContents(span);
    } catch (e) {
      // Handle partial selections
      span.textContent = selectedText;
      range.deleteContents();
      range.insertNode(span);
    }

    selection.removeAllRanges();
  }, []);

  const toggleToolbox = useCallback(() => {
    setState((prev) => ({ ...prev, showToolbox: !prev.showToolbox }));
  }, []);

  const setTemplate = useCallback((template: TemplateType) => {
    setState((prev) => ({ ...prev, currentTemplate: template }));
  }, []);

  const setZoom = useCallback((zoom: number) => {
    setState((prev) => ({ ...prev, zoom: Math.max(50, Math.min(150, zoom)) }));
  }, []);

  const setIsMobile = useCallback((isMobile: boolean) => {
    setState((prev) => ({ ...prev, isMobile }));
  }, []);

  const toggleAiModal = useCallback(() => {
    setState((prev) => ({ ...prev, showAiModal: !prev.showAiModal }));
  }, []);

  const toggleTemplateSelector = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showTemplateSelector: !prev.showTemplateSelector,
    }));
  }, []);

  const toggleExportMenu = useCallback(() => {
    setState((prev) => ({ ...prev, showExportMenu: !prev.showExportMenu }));
  }, []);

  const addSection = useCallback((sectionType: string) => {
    if (!resumeRef.current) return;

    const section = document.createElement("section");
    section.className = "resume-section mb-6";
    section.innerHTML = `
      <h2 class="text-sm font-bold uppercase tracking-wider border-b-2 pb-1 mb-3" contenteditable="true">
        ${sectionType}
      </h2>
      <div contenteditable="true" class="text-gray-700">
        Click to add content...
      </div>
    `;

    resumeRef.current.appendChild(section);
  }, []);
  const deleteSelectedElement = useCallback(() => {
    if (!state.selectedElement) return;

    const section =
      state.selectedElement.closest("[data-section]") ??
      state.selectedElement.closest("section");

    if (section && section.parentNode) {
      section.parentNode.removeChild(section);
    } else if (state.selectedElement.parentNode) {
      state.selectedElement.parentNode.removeChild(state.selectedElement);
    }

    setSelectedElement(null);
  }, [state.selectedElement]);

  const duplicateElement = useCallback(() => {
    if (state.selectedElement && state.selectedElement.parentNode) {
      const clone = state.selectedElement.cloneNode(true) as HTMLElement;
      state.selectedElement.parentNode.insertBefore(
        clone,
        state.selectedElement.nextSibling,
      );
    }
  }, [state.selectedElement]);

  return {
    state,
    textFormat,
    resumeRef,
    setSelectedElement,
    updateTextFormat,
    applyToSelection,
    toggleToolbox,
    setTemplate,
    setZoom,
    setIsMobile,
    toggleAiModal,
    toggleTemplateSelector,
    toggleExportMenu,
    addSection,
    deleteSelectedElement,
    duplicateElement,
  };
}
