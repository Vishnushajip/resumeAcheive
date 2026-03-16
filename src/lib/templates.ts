export type TemplateType =
  | "classic-professional"
  | "ats-clean"
  | "ats-minimal"
  | "ats-executive"
  | "ats-tech"
  | "ats-finance"
  | "ats-healthcare"
  | "ats-legal"
  | "modern-navy"
  | "modern-slate"
  | "modern-teal"
  | "creative-bold"
  | "creative-accent"
  | "sidebar-pro"
  | "sidebar-dark";

export interface TemplateConfig {
  id: TemplateType;
  name: string;
  description: string;
  category: "ats" | "professional" | "modern" | "creative" | "industry";
  atsScore: number; // 0-100
  tags: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
    headerBg: string;
    sidebarBg: string;
    divider: string;
    skillTag: string;
    skillTagText: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: {
    headerStyle: "left" | "centered" | "banner" | "sidebar";
    skillsStyle: "tags" | "list" | "inline" | "dots";
    sectionSpacing: "compact" | "normal" | "relaxed";
    dividerStyle: "line" | "thick" | "none" | "dotted";
    showPhoto: boolean;
  };
}

export const templates: Record<TemplateType, TemplateConfig> = {

  "ats-clean": {
    id: "ats-clean",
    name: "ATS Clean",
    description:
      "Pure single-column layout with zero decorative elements. Maximum ATS parse rate.",
    category: "ats",
    atsScore: 99,
    tags: ["ats", "single-column", "minimal", "recruiter-friendly"],
    colors: {
      primary: "#111827",
      secondary: "#374151",
      accent: "#111827",
      text: "#1f2937",
      background: "#ffffff",
      headerBg: "#ffffff",
      sidebarBg: "#ffffff",
      divider: "#d1d5db",
      skillTag: "#f3f4f6",
      skillTagText: "#111827",
    },
    fonts: {
      heading: "Arial, Helvetica, sans-serif",
      body: "Arial, Helvetica, sans-serif",
    },
    layout: {
      headerStyle: "left",
      skillsStyle: "inline",
      sectionSpacing: "normal",
      dividerStyle: "line",
      showPhoto: false,
    },
  },

  "ats-minimal": {
    id: "ats-minimal",
    name: "ATS Minimal",
    description:
      "Ultra-clean with subtle blue accents. Every element is machine-readable.",
    category: "ats",
    atsScore: 98,
    tags: ["ats", "minimal", "blue-accent", "corporate"],
    colors: {
      primary: "#1e3a5f",
      secondary: "#374151",
      accent: "#1e3a5f",
      text: "#1f2937",
      background: "#ffffff",
      headerBg: "#ffffff",
      sidebarBg: "#f8fafc",
      divider: "#cbd5e1",
      skillTag: "#eff6ff",
      skillTagText: "#1e3a5f",
    },
    fonts: {
      heading: "Calibri, Arial, sans-serif",
      body: "Calibri, Arial, sans-serif",
    },
    layout: {
      headerStyle: "left",
      skillsStyle: "tags",
      sectionSpacing: "normal",
      dividerStyle: "line",
      showPhoto: false,
    },
  },

  "ats-executive": {
    id: "ats-executive",
    name: "ATS Executive",
    description:
      "Senior-level layout with bold name treatment and structured hierarchy.",
    category: "ats",
    atsScore: 97,
    tags: ["ats", "executive", "senior", "leadership"],
    colors: {
      primary: "#0f172a",
      secondary: "#475569",
      accent: "#0f172a",
      text: "#1e293b",
      background: "#ffffff",
      headerBg: "#ffffff",
      sidebarBg: "#f8fafc",
      divider: "#94a3b8",
      skillTag: "#f1f5f9",
      skillTagText: "#0f172a",
    },
    fonts: {
      heading: "Georgia, 'Times New Roman', serif",
      body: "Arial, Helvetica, sans-serif",
    },
    layout: {
      headerStyle: "centered",
      skillsStyle: "inline",
      sectionSpacing: "relaxed",
      dividerStyle: "thick",
      showPhoto: false,
    },
  },

  "ats-tech": {
    id: "ats-tech",
    name: "ATS Tech",
    description:
      "Optimised for engineering & software roles. Skills section front and center.",
    category: "ats",
    atsScore: 97,
    tags: ["ats", "tech", "engineering", "software"],
    colors: {
      primary: "#0369a1",
      secondary: "#475569",
      accent: "#0369a1",
      text: "#1e293b",
      background: "#ffffff",
      headerBg: "#ffffff",
      sidebarBg: "#f0f9ff",
      divider: "#bae6fd",
      skillTag: "#e0f2fe",
      skillTagText: "#0369a1",
    },
    fonts: {
      heading: "Arial, Helvetica, sans-serif",
      body: "Arial, Helvetica, sans-serif",
    },
    layout: {
      headerStyle: "left",
      skillsStyle: "tags",
      sectionSpacing: "compact",
      dividerStyle: "line",
      showPhoto: false,
    },
  },

  "ats-finance": {
    id: "ats-finance",
    name: "ATS Finance",
    description:
      "Conservative layout tailored for banking, accounting, and finance roles.",
    category: "ats",
    atsScore: 98,
    tags: ["ats", "finance", "banking", "accounting"],
    colors: {
      primary: "#1a2e44",
      secondary: "#4b5563",
      accent: "#1a2e44",
      text: "#1f2937",
      background: "#ffffff",
      headerBg: "#ffffff",
      sidebarBg: "#f9fafb",
      divider: "#9ca3af",
      skillTag: "#f3f4f6",
      skillTagText: "#1a2e44",
    },
    fonts: {
      heading: "Times New Roman, Georgia, serif",
      body: "Arial, Helvetica, sans-serif",
    },
    layout: {
      headerStyle: "centered",
      skillsStyle: "inline",
      sectionSpacing: "normal",
      dividerStyle: "thick",
      showPhoto: false,
    },
  },

  "ats-healthcare": {
    id: "ats-healthcare",
    name: "ATS Healthcare",
    description:
      "Clean and professional for medical, nursing, and healthcare professionals.",
    category: "ats",
    atsScore: 97,
    tags: ["ats", "healthcare", "medical", "nursing"],
    colors: {
      primary: "#065f46",
      secondary: "#374151",
      accent: "#059669",
      text: "#1f2937",
      background: "#ffffff",
      headerBg: "#ffffff",
      sidebarBg: "#f0fdf4",
      divider: "#a7f3d0",
      skillTag: "#d1fae5",
      skillTagText: "#065f46",
    },
    fonts: {
      heading: "Arial, Helvetica, sans-serif",
      body: "Arial, Helvetica, sans-serif",
    },
    layout: {
      headerStyle: "left",
      skillsStyle: "tags",
      sectionSpacing: "normal",
      dividerStyle: "line",
      showPhoto: false,
    },
  },

  "ats-legal": {
    id: "ats-legal",
    name: "ATS Legal",
    description:
      "Traditional serif-accented layout for law firms and legal professionals.",
    category: "ats",
    atsScore: 96,
    tags: ["ats", "legal", "law", "paralegal"],
    colors: {
      primary: "#1c1917",
      secondary: "#57534e",
      accent: "#1c1917",
      text: "#1c1917",
      background: "#ffffff",
      headerBg: "#ffffff",
      sidebarBg: "#fafaf9",
      divider: "#a8a29e",
      skillTag: "#f5f5f4",
      skillTagText: "#1c1917",
    },
    fonts: {
      heading: "Georgia, 'Times New Roman', serif",
      body: "Georgia, 'Times New Roman', serif",
    },
    layout: {
      headerStyle: "centered",
      skillsStyle: "inline",
      sectionSpacing: "relaxed",
      dividerStyle: "line",
      showPhoto: false,
    },
  },


  "classic-professional": {
    id: "classic-professional",
    name: "Classic Professional",
    description:
      "Timeless design trusted by recruiters worldwide. Clean hierarchy and strong readability.",
    category: "professional",
    atsScore: 94,
    tags: ["professional", "classic", "general", "versatile"],
    colors: {
      primary: "#1d4ed8",
      secondary: "#4b5563",
      accent: "#1d4ed8",
      text: "#111827",
      background: "#ffffff",
      headerBg: "#ffffff",
      sidebarBg: "#eff6ff",
      divider: "#bfdbfe",
      skillTag: "#dbeafe",
      skillTagText: "#1d4ed8",
    },
    fonts: {
      heading: "Arial, Helvetica, sans-serif",
      body: "Arial, Helvetica, sans-serif",
    },
    layout: {
      headerStyle: "left",
      skillsStyle: "tags",
      sectionSpacing: "normal",
      dividerStyle: "line",
      showPhoto: false,
    },
  },

  "sidebar-pro": {
    id: "sidebar-pro",
    name: "Sidebar Pro",
    description:
      "Two-column layout with a structured left sidebar for skills and contact info.",
    category: "professional",
    atsScore: 82,
    tags: ["professional", "two-column", "sidebar", "structured"],
    colors: {
      primary: "#ffffff",
      secondary: "#cbd5e1",
      accent: "#38bdf8",
      text: "#1e293b",
      background: "#ffffff",
      headerBg: "#1e293b",
      sidebarBg: "#1e293b",
      divider: "#334155",
      skillTag: "#334155",
      skillTagText: "#e2e8f0",
    },
    fonts: {
      heading: "Arial, Helvetica, sans-serif",
      body: "Arial, Helvetica, sans-serif",
    },
    layout: {
      headerStyle: "sidebar",
      skillsStyle: "list",
      sectionSpacing: "normal",
      dividerStyle: "line",
      showPhoto: false,
    },
  },

  "sidebar-dark": {
    id: "sidebar-dark",
    name: "Sidebar Dark",
    description:
      "Premium dark sidebar with clean white main content. Bold visual impact.",
    category: "professional",
    atsScore: 80,
    tags: ["professional", "two-column", "dark-sidebar", "bold"],
    colors: {
      primary: "#ffffff",
      secondary: "#94a3b8",
      accent: "#6366f1",
      text: "#1e293b",
      background: "#ffffff",
      headerBg: "#0f172a",
      sidebarBg: "#0f172a",
      divider: "#1e293b",
      skillTag: "#1e293b",
      skillTagText: "#e2e8f0",
    },
    fonts: {
      heading: "Arial, Helvetica, sans-serif",
      body: "Arial, Helvetica, sans-serif",
    },
    layout: {
      headerStyle: "sidebar",
      skillsStyle: "dots",
      sectionSpacing: "normal",
      dividerStyle: "none",
      showPhoto: false,
    },
  },

  // ─── MODERN ──────────────────────────────────────────────────────────────────

  "modern-navy": {
    id: "modern-navy",
    name: "Modern Navy",
    description:
      "Bold navy banner header with clean white body. Modern and highly readable.",
    category: "modern",
    atsScore: 88,
    tags: ["modern", "navy", "banner", "bold"],
    colors: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.75)",
      accent: "#38bdf8",
      text: "#1e293b",
      background: "#ffffff",
      headerBg: "#0f2d5e",
      sidebarBg: "#eff6ff",
      divider: "#bfdbfe",
      skillTag: "#dbeafe",
      skillTagText: "#1d4ed8",
    },
    fonts: {
      heading: "Arial, Helvetica, sans-serif",
      body: "Arial, Helvetica, sans-serif",
    },
    layout: {
      headerStyle: "banner",
      skillsStyle: "tags",
      sectionSpacing: "normal",
      dividerStyle: "line",
      showPhoto: false,
    },
  },

  "modern-slate": {
    id: "modern-slate",
    name: "Modern Slate",
    description:
      "Elegant slate tones with a centered header. Sophisticated and contemporary.",
    category: "modern",
    atsScore: 86,
    tags: ["modern", "slate", "centered", "elegant"],
    colors: {
      primary: "#334155",
      secondary: "#64748b",
      accent: "#334155",
      text: "#1e293b",
      background: "#ffffff",
      headerBg: "#f8fafc",
      sidebarBg: "#f8fafc",
      divider: "#e2e8f0",
      skillTag: "#f1f5f9",
      skillTagText: "#334155",
    },
    fonts: {
      heading: "Georgia, serif",
      body: "Arial, Helvetica, sans-serif",
    },
    layout: {
      headerStyle: "centered",
      skillsStyle: "tags",
      sectionSpacing: "relaxed",
      dividerStyle: "dotted",
      showPhoto: false,
    },
  },

  "modern-teal": {
    id: "modern-teal",
    name: "Modern Teal",
    description:
      "Vibrant teal accents on a crisp white base. Stands out while staying professional.",
    category: "modern",
    atsScore: 85,
    tags: ["modern", "teal", "vibrant", "creative-professional"],
    colors: {
      primary: "#0f766e",
      secondary: "#4b5563",
      accent: "#0d9488",
      text: "#111827",
      background: "#ffffff",
      headerBg: "#f0fdfa",
      sidebarBg: "#f0fdfa",
      divider: "#99f6e4",
      skillTag: "#ccfbf1",
      skillTagText: "#0f766e",
    },
    fonts: {
      heading: "Arial, Helvetica, sans-serif",
      body: "Arial, Helvetica, sans-serif",
    },
    layout: {
      headerStyle: "left",
      skillsStyle: "tags",
      sectionSpacing: "normal",
      dividerStyle: "line",
      showPhoto: false,
    },
  },

  // ─── CREATIVE ────────────────────────────────────────────────────────────────

  "creative-bold": {
    id: "creative-bold",
    name: "Creative Bold",
    description:
      "High-contrast dark header with strong typography. Great for design and marketing roles.",
    category: "creative",
    atsScore: 72,
    tags: ["creative", "bold", "design", "marketing"],
    colors: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.7)",
      accent: "#f59e0b",
      text: "#111827",
      background: "#ffffff",
      headerBg: "#111827",
      sidebarBg: "#1f2937",
      divider: "#f59e0b",
      skillTag: "#fef3c7",
      skillTagText: "#92400e",
    },
    fonts: {
      heading: "Arial Black, Arial, sans-serif",
      body: "Arial, Helvetica, sans-serif",
    },
    layout: {
      headerStyle: "banner",
      skillsStyle: "tags",
      sectionSpacing: "normal",
      dividerStyle: "thick",
      showPhoto: false,
    },
  },

  "creative-accent": {
    id: "creative-accent",
    name: "Creative Accent",
    description:
      "Vibrant purple accent with modern proportions. Ideal for tech startups and creative agencies.",
    category: "creative",
    atsScore: 70,
    tags: ["creative", "purple", "startup", "agency"],
    colors: {
      primary: "#6d28d9",
      secondary: "#6b7280",
      accent: "#7c3aed",
      text: "#111827",
      background: "#ffffff",
      headerBg: "#faf5ff",
      sidebarBg: "#faf5ff",
      divider: "#ddd6fe",
      skillTag: "#ede9fe",
      skillTagText: "#5b21b6",
    },
    fonts: {
      heading: "Arial, Helvetica, sans-serif",
      body: "Arial, Helvetica, sans-serif",
    },
    layout: {
      headerStyle: "left",
      skillsStyle: "tags",
      sectionSpacing: "normal",
      dividerStyle: "line",
      showPhoto: false,
    },
  },
};


export function getTemplateById(id: TemplateType): TemplateConfig {
  return templates[id] ?? templates["ats-clean"];
}

export function getTemplatesByCategory(
  category: TemplateConfig["category"] | "all",
): TemplateConfig[] {
  const all = Object.values(templates);
  if (category === "all") return all;
  return all.filter((t) => t.category === category);
}

export function getATSFriendlyTemplates(): TemplateConfig[] {
  return Object.values(templates)
    .filter((t) => t.atsScore >= 90)
    .sort((a, b) => b.atsScore - a.atsScore);
}

export const DEFAULT_TEMPLATE: TemplateType = "ats-clean";