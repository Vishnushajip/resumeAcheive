"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Monitor,
  Layout,
  Type,
  ZoomIn,
  ZoomOut,
  Save,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { useEditorStore } from "@/store/editor.store";
import { useAuthStore } from "@/store/auth.store";
import { cvService } from "@/services/cv.service";
import { useEditor } from "@/hooks/useEditor";
import { templates, TemplateType, getTemplateById } from "@/lib/templates";
import { Toolbox } from "@/components/editor/Toolbox";
import { MobileToolbox } from "@/components/editor/MobileToolbox";
import { AISuggestionModal } from "@/components/editor/AISuggestionModal";
import { TemplateSelector } from "@/components/editor/TemplateSelector";
import { ExportMenu } from "@/components/editor/ExportMenu";

interface ResumeData {
  personalInfo?: {
    fullName?: string;
    name?: string;
    title?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
  summary?: string;
  experience?: Array<{
    company?: string;
    role?: string;
    position?: string;
    duration?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    points?: string[];
    responsibilities?: string[];
  }>;
  education?: Array<{
    institution?: string;
    school?: string;
    degree?: string;
    year?: string;
  }>;
  skills?: string[] | { technical?: string[]; soft?: string[] };
  projects?: Array<{
    name?: string;
    description?: string;
    points?: string[];
  }>;
}

function normalizeResume(data: any): ResumeData {
  const resume = data?.resume || data?.cvData?.resume || data;
  return {
    personalInfo: {
      fullName:
        resume?.personalInfo?.fullName ||
        resume?.personalInfo?.name ||
        "Your Name",
      title: resume?.personalInfo?.title || "Professional Title",
      email: resume?.personalInfo?.email || "",
      phone: resume?.personalInfo?.phone || "",
      location: resume?.personalInfo?.location || "",
    },
    summary: resume?.summary || "",
    experience: (resume?.experience || []).map((exp: any) => ({
      company: exp?.company || "",
      role: exp?.role || exp?.position || "",
      duration:
        exp?.duration || `${exp?.startDate || ""} - ${exp?.endDate || ""}`,
      description: exp?.description || "",
      points: exp?.points || exp?.responsibilities || [],
    })),
    education: (resume?.education || []).map((edu: any) => ({
      institution: edu?.institution || edu?.school || "",
      degree: edu?.degree || "",
      year: edu?.year || "",
    })),
    skills: resume?.skills || [],
    projects: (resume?.projects || []).map((proj: any) => ({
      name: proj?.name || "",
      description: proj?.description || "",
      points: proj?.points || [],
    })),
  };
}

export default function OutputPage() {
  const { resumeData, atsData } = useEditorStore();
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const cvId = searchParams.get("id");

  const [localResumeData, setLocalResumeData] = useState<ResumeData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(
    null,
  );
  const [aiModalContext, setAiModalContext] = useState({
    isOpen: false,
    text: "",
    section: "",
  });
  const [floatingToolbar, setFloatingToolbar] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({ visible: false, x: 0, y: 0 });
  const [showTutorial, setShowTutorial] = useState(true);
  const [mobileScale, setMobileScale] = useState(0.45);

  const {
    state: editorState,
    textFormat,
    resumeRef,
    updateTextFormat,
    applyToSelection,
    toggleToolbox,
    setTemplate,
    setZoom,
    setIsMobile,
    toggleAiModal,
    toggleTemplateSelector,
    addSection,
    deleteSelectedElement,
    duplicateElement,
  } = useEditor();

  // Load CV data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        if (cvId) {
          const data = await cvService.getCV(cvId);
          const rawCV = data?.cvData || data?.data?.cvData || data;
          if (rawCV) {
            setLocalResumeData(normalizeResume(rawCV));
          }
        } else if (resumeData) {
          setLocalResumeData(normalizeResume(resumeData));
        }
      } catch {
        toast.error("Failed to load resume data");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [cvId, resumeData]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsMobile]);

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        setSelectedText(selection.toString());
        const element = selection.anchorNode?.parentElement as HTMLElement;
        setSelectedElement(element);

        // Show floating toolbar near selection
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        // Calculate center but keep within viewport bounds (with padding)
        let centerX = rect.left + rect.width / 2;
        centerX = Math.max(100, Math.min(viewportWidth - 100, centerX));
        setFloatingToolbar({
          visible: true,
          x: centerX,
          y: rect.top - 50,
        });
        // Hide tutorial once user starts selecting text
        setShowTutorial(false);
      } else {
        setSelectedText("");
        setSelectedElement(null);
        setFloatingToolbar((prev) => ({ ...prev, visible: false }));
      }
    };

    document.addEventListener("selectionchange", handleSelection);
    return () =>
      document.removeEventListener("selectionchange", handleSelection);
  }, []);

  // Handle click outside to hide toolbar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-floating-toolbar]")) {
        setFloatingToolbar((prev) => ({ ...prev, visible: false }));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent default context menu on resume content and show custom toolbar
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Only prevent if clicking inside the resume editor
      if (target.closest("[data-resume-content]") && selectedText) {
        e.preventDefault();
        // Show toolbar at mouse position
        setFloatingToolbar({
          visible: true,
          x: e.clientX,
          y: e.clientY - 50,
        });
      }
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, [selectedText]);

  const handleSave = async () => {
    console.log(
      "Save clicked - cvId:",
      cvId,
      "has resumeRef:",
      !!resumeRef.current,
      "has localResumeData:",
      !!localResumeData,
    );

    if (!resumeRef.current) {
      toast.error("Resume not loaded");
      return;
    }
    if (!localResumeData) {
      toast.error("Resume data not loaded");
      return;
    }

    setIsSaving(true);
    try {
      // Extract updated data from the editable resume
      const updatedData = extractResumeDataFromDOM(resumeRef.current);
      console.log("Extracted data:", updatedData);

      // Prepare data according to backend API structure
      const saveData = {
        title:
          updatedData.personalInfo?.fullName ||
          localResumeData.personalInfo?.fullName ||
          "My Resume",
        cvData: {
          ...localResumeData,
          ...updatedData,
        },
        templateId: editorState.currentTemplate,
        isActive: true,
      };
      console.log("Saving data:", saveData);

      let result;
      if (cvId) {
        // Update existing CV
        result = await cvService.updateCV(cvId, saveData);
        toast.success("Resume updated successfully!");
      } else {
        // Create new CV
        result = await cvService.createCV(saveData);
        toast.success("New resume created successfully!");
        // Update URL with new CV ID
        if (result?.id) {
          router.push(`/dashboard/output?id=${result.id}`);
        }
      }
      console.log("Save result:", result);
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save resume");
    } finally {
      setIsSaving(false);
    }
  };

  // Helper function to extract resume data from DOM
  const extractResumeDataFromDOM = (
    container: HTMLElement,
  ): Partial<ResumeData> => {
    const data: Partial<ResumeData> = {};

    // Extract personal info
    const header = container.querySelector("header");
    if (header) {
      const nameEl = header.querySelector("h1");
      const titleEl = header.querySelector("p");
      const contactDiv = header.querySelector("div:last-child");

      data.personalInfo = {
        fullName: nameEl?.textContent || "",
        title: titleEl?.textContent || "",
        email: contactDiv?.children[0]?.textContent || "",
        phone: contactDiv?.children[1]?.textContent || "",
        location: contactDiv?.children[2]?.textContent || "",
      };
    }

    // Extract summary
    const summarySection = Array.from(
      container.querySelectorAll("section"),
    ).find((s) =>
      s.querySelector("h2")?.textContent?.toLowerCase().includes("summary"),
    );
    if (summarySection) {
      data.summary = summarySection.querySelector("p")?.textContent || "";
    }

    // Extract experience
    const expSection = Array.from(container.querySelectorAll("section")).find(
      (s) =>
        s
          .querySelector("h2")
          ?.textContent?.toLowerCase()
          .includes("experience"),
    );
    if (expSection) {
      const expItems = expSection.querySelectorAll("div > div");
      data.experience = Array.from(expItems).map((item) => ({
        role: item.querySelector("h3")?.textContent || "",
        duration: item.querySelector("span")?.textContent || "",
        company: item.querySelector("p")?.textContent || "",
        points: Array.from(item.querySelectorAll("li")).map(
          (li) => li.textContent || "",
        ),
      }));
    }

    // Extract education
    const eduSection = Array.from(container.querySelectorAll("section")).find(
      (s) =>
        s.querySelector("h2")?.textContent?.toLowerCase().includes("education"),
    );
    if (eduSection) {
      const eduItems = eduSection.querySelectorAll("div > div");
      data.education = Array.from(eduItems).map((item) => ({
        degree: item.querySelector("h3")?.textContent || "",
        year: item.querySelector("span")?.textContent || "",
        institution: item.querySelector("p")?.textContent || "",
      }));
    }

    // Extract skills
    const skillsSection = Array.from(
      container.querySelectorAll("section"),
    ).find((s) =>
      s.querySelector("h2")?.textContent?.toLowerCase().includes("skills"),
    );
    if (skillsSection) {
      const skillItems = skillsSection.querySelectorAll("span");
      data.skills = Array.from(skillItems)
        .map((s) => s.textContent || "")
        .filter(Boolean);
    }

    // Extract projects
    const projSection = Array.from(container.querySelectorAll("section")).find(
      (s) =>
        s.querySelector("h2")?.textContent?.toLowerCase().includes("project"),
    );
    if (projSection) {
      const projItems = projSection.querySelectorAll("div > div");
      data.projects = Array.from(projItems).map((item) => ({
        name: item.querySelector("h3")?.textContent || "",
        points: Array.from(item.querySelectorAll("li")).map(
          (li) => li.textContent || "",
        ),
      }));
    }

    return data;
  };

  const handleOpenAI = () => {
    const section =
      selectedElement?.closest("section")?.querySelector("h2")?.textContent ||
      "text";
    setAiModalContext({
      isOpen: true,
      text: selectedText,
      section,
    });
  };

  const handleApplyAI = (newText: string) => {
    if (selectedElement) {
      selectedElement.textContent = newText;
    }
    setAiModalContext({ ...aiModalContext, isOpen: false });
  };

  const handleAddSection = (type: string) => {
    if (!resumeRef.current) return;

    const section = document.createElement("section");
    section.className = "mb-6";
    section.innerHTML = `
      <h2 class="text-sm font-bold uppercase tracking-wider border-b-2 pb-1 mb-3" contenteditable="true" style="color: ${templateConfig.colors.primary}; border-color: ${templateConfig.colors.accent};">
        ${type}
      </h2>
      <div contenteditable="true" class="text-gray-700">
        <p>Click to add ${type.toLowerCase()} details...</p>
      </div>
    `;
    resumeRef.current.appendChild(section);
    toast.success(`${type} section added!`);
  };

  const resume = localResumeData;
  const templateConfig = getTemplateById(editorState.currentTemplate);

  const skillsArray = Array.isArray(resume?.skills)
    ? resume.skills
    : [...(resume?.skills?.technical || []), ...(resume?.skills?.soft || [])];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Resume Data
          </h2>
          <p className="text-gray-600 mb-4">Please create a resume first.</p>
          <Link href="/dashboard/upload">
            <Button>Create Resume</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </Link>
              <h1 className="text-lg font-bold hidden sm:block">
                Resume Editor
              </h1>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {/* View Mode */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("desktop")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "desktop"
                      ? "bg-white shadow-sm"
                      : "text-gray-500"
                  }`}
                >
                  <Monitor className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("mobile")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "mobile"
                      ? "bg-white shadow-sm"
                      : "text-gray-500"
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                </button>
              </div>

              {/* Zoom Controls - Desktop */}
              <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setZoom(Math.max(50, editorState.zoom - 10))}
                  className="p-2 rounded-md hover:bg-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="px-2 text-sm font-medium min-w-[3rem] text-center">
                  {editorState.zoom}%
                </span>
                <button
                  onClick={() => setZoom(Math.min(150, editorState.zoom + 10))}
                  className="p-2 rounded-md hover:bg-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setZoom(100)}
                  className="p-2 rounded-md hover:bg-white transition-colors text-xs font-medium"
                  title="Reset Zoom"
                >
                  100%
                </button>
                <button
                  onClick={() => {
                    // Fit to screen - calculate scale based on container width
                    const containerWidth = window.innerWidth - 400; // Account for sidebars
                    const scale = Math.min(
                      100,
                      Math.floor((containerWidth / 794) * 100),
                    );
                    setZoom(Math.max(50, scale));
                  }}
                  className="p-2 rounded-md hover:bg-white transition-colors text-xs font-medium"
                  title="Fit to Screen"
                >
                  Fit
                </button>
              </div>

              {/* Zoom Controls - Mobile */}
              {viewMode === "mobile" && (
                <div className="flex sm:hidden items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() =>
                      setMobileScale(Math.max(0.25, mobileScale - 0.05))
                    }
                    className="p-2 rounded-md hover:bg-white transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="px-2 text-sm font-medium min-w-[3rem] text-center">
                    {Math.round(mobileScale * 100)}%
                  </span>
                  <button
                    onClick={() =>
                      setMobileScale(Math.min(1.0, mobileScale + 0.05))
                    }
                    className="p-2 rounded-md hover:bg-white transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      // Fit to screen - calculate scale based on mobile screen width
                      const screenWidth = window.innerWidth - 32;
                      const scale = Math.min(0.8, screenWidth / 794);
                      setMobileScale(Math.max(0.25, scale));
                    }}
                    className="px-2 py-1.5 rounded-md hover:bg-white transition-colors text-xs font-medium"
                    title="Fit to Screen"
                  >
                    Fit
                  </button>
                </div>
              )}

              {/* Template Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTemplateSelector}
                className="hidden sm:flex"
              >
                <Layout className="h-4 w-4 mr-1" />
                Template
              </Button>

              {/* Save Button */}
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </>
                )}
              </Button>

              <div className="relative">
                <Button
                  size="sm"
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                {showExportMenu && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onMouseDown={(e) => {
                      if (e.target === e.currentTarget)
                        setShowExportMenu(false);
                    }}
                  >
                    <div className="w-[340px]">
                      <ExportMenu
                        resumeRef={resumeRef as React.RefObject<HTMLDivElement>}
                        fileName={resume.personalInfo?.fullName || "Resume"}
                        resumeData={resume}
                        onClose={() => setShowExportMenu(false)}
                      />
                    </div>
                  </div>
                )}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={toggleToolbox}
                className="sm:hidden"
              >
                <Type className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Toolbox (Desktop) */}
          <div className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="sticky top-24">
              <Toolbox
                textFormat={textFormat}
                updateTextFormat={updateTextFormat}
                applyToSelection={applyToSelection}
                onAddSection={handleAddSection}
                onDeleteElement={deleteSelectedElement}
                onDuplicateElement={duplicateElement}
                onOpenAI={handleOpenAI}
                hasSelection={!!selectedText}
              />
            </div>
          </div>

          {/* Center - Resume Preview */}
          <div className="flex-1 min-w-0 overflow-x-auto">
            <div
              className="mx-auto bg-white shadow-xl transition-all duration-300"
              style={{
                width: "794px", // Fixed A4 width
                minHeight: "1123px", // Fixed A4 height
                maxWidth: "none",
                transform: `scale(${viewMode === "mobile" ? mobileScale : editorState.zoom / 100})`,
                transformOrigin: "top center",
              }}
            >
              <div
                ref={resumeRef}
                data-resume-content
                className="w-full h-full p-8 sm:p-10 relative"
                style={{
                  fontFamily: templateConfig.fonts.body,
                  color: templateConfig.colors.text,
                  background: templateConfig.colors.background,
                }}
              >
                {/* Tutorial Tooltip */}
                {showTutorial && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-xl shadow-xl shadow-purple-500/30 max-w-xs">
                      <div className="flex items-start gap-3">
                        <Sparkles className="h-5 w-5 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">
                            Pro Tip: AI Enhancement
                          </p>
                          <p className="text-xs text-white/90 mt-1">
                            Select any text and click "Ask AI" to improve it
                            instantly!
                          </p>
                        </div>
                        <button
                          onClick={() => setShowTutorial(false)}
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      {/* Arrow pointing down */}
                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-blue-600 transform rotate-45" />
                    </div>
                  </div>
                )}
                {/* Header */}
                <header
                  className="mb-6"
                  style={{
                    textAlign:
                      templateConfig.layout.headerStyle === "centered"
                        ? "center"
                        : "left",
                    background:
                      templateConfig.layout.headerStyle === "banner"
                        ? templateConfig.colors.headerBg
                        : "transparent",
                    margin:
                      templateConfig.layout.headerStyle === "banner"
                        ? "-40px -40px 24px -40px"
                        : "0",
                    padding:
                      templateConfig.layout.headerStyle === "banner"
                        ? "40px"
                        : "0",
                  }}
                >
                  <h1
                    className="text-2xl font-bold mb-1"
                    contentEditable
                    suppressContentEditableWarning
                    style={{
                      color:
                        templateConfig.layout.headerStyle === "banner"
                          ? "#ffffff"
                          : templateConfig.colors.primary,
                      fontFamily: templateConfig.fonts.heading,
                    }}
                  >
                    {resume.personalInfo?.fullName}
                  </h1>
                  <p
                    className="text-base mb-2"
                    contentEditable
                    suppressContentEditableWarning
                    style={{
                      color:
                        templateConfig.layout.headerStyle === "banner"
                          ? "rgba(255,255,255,0.8)"
                          : templateConfig.colors.secondary,
                    }}
                  >
                    {resume.personalInfo?.title}
                  </p>
                  <div
                    className="flex flex-wrap gap-3 text-sm"
                    style={{
                      justifyContent:
                        templateConfig.layout.headerStyle === "centered"
                          ? "center"
                          : "flex-start",
                      color:
                        templateConfig.layout.headerStyle === "banner"
                          ? "rgba(255,255,255,0.7)"
                          : templateConfig.colors.secondary,
                    }}
                  >
                    {resume.personalInfo?.email && (
                      <span contentEditable suppressContentEditableWarning>
                        {resume.personalInfo.email}
                      </span>
                    )}
                    {resume.personalInfo?.phone && (
                      <span contentEditable suppressContentEditableWarning>
                        {resume.personalInfo.phone}
                      </span>
                    )}
                    {resume.personalInfo?.location && (
                      <span contentEditable suppressContentEditableWarning>
                        {resume.personalInfo.location}
                      </span>
                    )}
                  </div>
                </header>

                {/* Summary */}
                {resume.summary && (
                  <section className="mb-6">
                    <h2
                      className="text-sm font-bold uppercase tracking-wider border-b-2 pb-1 mb-3"
                      contentEditable
                      suppressContentEditableWarning
                      style={{
                        color: templateConfig.colors.primary,
                        borderColor: templateConfig.colors.accent,
                        fontFamily: templateConfig.fonts.heading,
                      }}
                    >
                      Professional Summary
                    </h2>
                    <p
                      className="leading-relaxed"
                      contentEditable
                      suppressContentEditableWarning
                      style={{ color: templateConfig.colors.text }}
                    >
                      {resume.summary}
                    </p>
                  </section>
                )}

                {/* Experience */}
                {resume.experience && resume.experience.length > 0 && (
                  <section className="mb-6">
                    <h2
                      className="text-sm font-bold uppercase tracking-wider border-b-2 pb-1 mb-3"
                      contentEditable
                      suppressContentEditableWarning
                      style={{
                        color: templateConfig.colors.primary,
                        borderColor: templateConfig.colors.accent,
                        fontFamily: templateConfig.fonts.heading,
                      }}
                    >
                      Experience
                    </h2>
                    <div className="space-y-4">
                      {resume.experience.map((exp, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-start mb-1">
                            <h3
                              className="font-semibold"
                              contentEditable
                              suppressContentEditableWarning
                              style={{ color: templateConfig.colors.primary }}
                            >
                              {exp.role}
                            </h3>
                            <span
                              className="text-sm"
                              contentEditable
                              suppressContentEditableWarning
                              style={{ color: templateConfig.colors.secondary }}
                            >
                              {exp.duration}
                            </span>
                          </div>
                          <p
                            className="mb-2"
                            contentEditable
                            suppressContentEditableWarning
                            style={{ color: templateConfig.colors.secondary }}
                          >
                            {exp.company}
                          </p>
                          {exp.points && exp.points.length > 0 ? (
                            <ul className="list-disc list-inside space-y-1">
                              {exp.points.map((point, i) => (
                                <li
                                  key={i}
                                  className="text-sm"
                                  contentEditable
                                  suppressContentEditableWarning
                                  style={{ color: templateConfig.colors.text }}
                                >
                                  {point}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Education */}
                {resume.education && resume.education.length > 0 && (
                  <section className="mb-6">
                    <h2
                      className="text-sm font-bold uppercase tracking-wider border-b-2 pb-1 mb-3"
                      contentEditable
                      suppressContentEditableWarning
                      style={{
                        color: templateConfig.colors.primary,
                        borderColor: templateConfig.colors.accent,
                        fontFamily: templateConfig.fonts.heading,
                      }}
                    >
                      Education
                    </h2>
                    <div className="space-y-3">
                      {resume.education.map((edu, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-start">
                            <h3
                              className="font-semibold"
                              contentEditable
                              suppressContentEditableWarning
                              style={{ color: templateConfig.colors.primary }}
                            >
                              {edu.degree}
                            </h3>
                            <span
                              className="text-sm"
                              contentEditable
                              suppressContentEditableWarning
                              style={{ color: templateConfig.colors.secondary }}
                            >
                              {edu.year}
                            </span>
                          </div>
                          <p
                            contentEditable
                            suppressContentEditableWarning
                            style={{ color: templateConfig.colors.secondary }}
                          >
                            {edu.institution}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Skills */}
                {skillsArray.length > 0 && (
                  <section className="mb-6">
                    <h2
                      className="text-sm font-bold uppercase tracking-wider border-b-2 pb-1 mb-3"
                      contentEditable
                      suppressContentEditableWarning
                      style={{
                        color: templateConfig.colors.primary,
                        borderColor: templateConfig.colors.accent,
                        fontFamily: templateConfig.fonts.heading,
                      }}
                    >
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {skillsArray.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded text-sm"
                          contentEditable
                          suppressContentEditableWarning
                          style={{
                            background:
                              templateConfig.layout.skillsStyle === "tags"
                                ? templateConfig.colors.accent + "20"
                                : "transparent",
                            color: templateConfig.colors.text,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Projects */}
                {resume.projects && resume.projects.length > 0 && (
                  <section className="mb-6">
                    <h2
                      className="text-sm font-bold uppercase tracking-wider border-b-2 pb-1 mb-3"
                      contentEditable
                      suppressContentEditableWarning
                      style={{
                        color: templateConfig.colors.primary,
                        borderColor: templateConfig.colors.accent,
                        fontFamily: templateConfig.fonts.heading,
                      }}
                    >
                      Projects
                    </h2>
                    <div className="space-y-4">
                      {resume.projects.map((proj, index) => (
                        <div key={index}>
                          <h3
                            className="font-semibold mb-1"
                            contentEditable
                            suppressContentEditableWarning
                            style={{ color: templateConfig.colors.primary }}
                          >
                            {proj.name}
                          </h3>
                          {proj.points && proj.points.length > 0 ? (
                            <ul className="list-disc list-inside space-y-1">
                              {proj.points.map((point, i) => (
                                <li
                                  key={i}
                                  className="text-sm"
                                  contentEditable
                                  suppressContentEditableWarning
                                  style={{ color: templateConfig.colors.text }}
                                >
                                  {point}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - ATS Score (Desktop) */}
          <div className="hidden xl:block xl:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {atsData?.score && (
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    ATS Score
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="6"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke={
                            parseInt(atsData.score) >= 80
                              ? "#10b981"
                              : parseInt(atsData.score) >= 60
                                ? "#f59e0b"
                                : "#ef4444"
                          }
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${(parseInt(atsData.score) / 100) * 176} 176`}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                        {atsData.score}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {parseInt(atsData.score) >= 80
                        ? "Excellent!"
                        : parseInt(atsData.score) >= 60
                          ? "Good score"
                          : "Needs work"}
                    </p>
                  </div>
                </div>
              )}

              {atsData?.tips && atsData.tips.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <h3 className="font-semibold mb-2 text-sm">Tips</h3>
                  <ul className="space-y-2">
                    {atsData.tips.slice(0, 3).map((tip, index) => (
                      <li
                        key={index}
                        className="text-xs text-gray-600 flex items-start gap-1"
                      >
                        <span className="text-blue-500">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Floating AI Toolbar - appears when text is selected */}
      {floatingToolbar.visible && selectedText && (
        <div
          data-floating-toolbar
          className="fixed z-50 animate-in fade-in zoom-in duration-200"
          style={{
            left: `${Math.max(80, Math.min(window.innerWidth - 80, floatingToolbar.x))}px`,
            top: `${Math.max(10, floatingToolbar.y)}px`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="flex items-center gap-1 bg-gray-900 text-white rounded-lg shadow-xl shadow-black/30 p-1.5 border border-gray-700 whitespace-nowrap">
            <button
              onClick={handleOpenAI}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md text-sm font-medium hover:from-purple-500 hover:to-blue-500 transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Ask AI
            </button>
            <div className="w-px h-5 bg-gray-700 mx-1" />
            <button
              onClick={() => {
                navigator.clipboard.writeText(selectedText);
                toast.success("Copied!");
              }}
              className="px-2 py-1.5 text-xs hover:bg-gray-800 rounded transition-colors"
            >
              Copy
            </button>
            <button
              onClick={() => {
                const selection = window.getSelection();
                selection?.selectAllChildren(
                  selection.anchorNode?.parentElement || document.body,
                );
              }}
              className="px-2 py-1.5 text-xs hover:bg-gray-800 rounded transition-colors"
            >
              Select All
            </button>
          </div>
          {/* Arrow pointing down */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-gray-900 border-r border-b border-gray-700 transform rotate-45" />
        </div>
      )}

      {/* Mobile Toolbox */}
      <MobileToolbox
        isOpen={editorState.showToolbox}
        onClose={toggleToolbox}
        textFormat={textFormat}
        applyToSelection={applyToSelection}
        onAddSection={handleAddSection}
        onDeleteElement={deleteSelectedElement}
        onOpenAI={handleOpenAI}
        hasSelection={!!selectedText}
      />

      {/* AI Suggestion Modal */}
      <AISuggestionModal
        isOpen={aiModalContext.isOpen}
        onClose={() => setAiModalContext({ ...aiModalContext, isOpen: false })}
        originalText={aiModalContext.text}
        section={aiModalContext.section}
        onApply={handleApplyAI}
      />

      {/* Template Selector */}
      <TemplateSelector
        isOpen={editorState.showTemplateSelector}
        onClose={toggleTemplateSelector}
        currentTemplate={editorState.currentTemplate}
        onSelect={setTemplate}
      />

      {/* Click outside to close export menu */}
      {showExportMenu && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowExportMenu(false)}
        />
      )}
    </div>
  );
}
