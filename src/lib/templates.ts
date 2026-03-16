export type TemplateType =
  | "classic"
  | "modern"
  | "minimal"
  | "executive"
  | "sidebar"
  | "tech"
  | "academic"
  | "healthcare"
  | "marketing"
  | "finance"
  | "startup"
  | "twocolumn";

export interface TemplateConfig {
  id: TemplateType;
  name: string;
  description: string;
  category: "professional" | "creative" | "modern" | "industry";
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
    headerBg?: string;
    sidebarBg?: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: {
    headerStyle: "centered" | "left" | "sidebar" | "banner";
    sectionStyle: "boxed" | "lined" | "spaced" | "minimal";
    skillsStyle: "tags" | "list" | "columns";
    maxWidth: string;
    padding: string;
  };
}

export const templates: Record<TemplateType, TemplateConfig> = {
  classic: {
    id: "classic",
    name: "Classic Professional",
    description: "Traditional, timeless design suitable for any industry",
    category: "professional",
    colors: {
      primary: "#1f2937",
      secondary: "#4b5563",
      background: "#ffffff",
      text: "#1f2937",
      accent: "#1f2937",
    },
    fonts: {
      heading: "Georgia, 'Times New Roman', serif",
      body: "Georgia, 'Times New Roman', serif",
    },
    layout: {
      headerStyle: "centered",
      sectionStyle: "lined",
      skillsStyle: "list",
      maxWidth: "800px",
      padding: "40px",
    },
  },

  modern: {
    id: "modern",
    name: "Modern Minimal",
    description: "Clean and contemporary with subtle blue accents",
    category: "modern",
    colors: {
      primary: "#2563eb",
      secondary: "#3b82f6",
      background: "#ffffff",
      text: "#1f2937",
      accent: "#2563eb",
      headerBg: "#eff6ff",
    },
    fonts: {
      heading: "'Helvetica Neue', Arial, sans-serif",
      body: "'Helvetica Neue', Arial, sans-serif",
    },
    layout: {
      headerStyle: "left",
      sectionStyle: "boxed",
      skillsStyle: "tags",
      maxWidth: "800px",
      padding: "40px",
    },
  },

  minimal: {
    id: "minimal",
    name: "Ultra Minimal",
    description: "Maximum whitespace with elegant typography",
    category: "modern",
    colors: {
      primary: "#374151",
      secondary: "#6b7280",
      background: "#ffffff",
      text: "#1f2937",
      accent: "#374151",
    },
    fonts: {
      heading: "'Arial Narrow', Arial, sans-serif",
      body: "Arial, sans-serif",
    },
    layout: {
      headerStyle: "centered",
      sectionStyle: "spaced",
      skillsStyle: "list",
      maxWidth: "800px",
      padding: "48px",
    },
  },

  executive: {
    id: "executive",
    name: "Executive Bold",
    description: "Strong presence with dark header for leadership roles",
    category: "professional",
    colors: {
      primary: "#7c2d12",
      secondary: "#92400e",
      background: "#fffbf5",
      text: "#1f2937",
      accent: "#7c2d12",
      headerBg: "#7c2d12",
    },
    fonts: {
      heading: "Georgia, 'Times New Roman', serif",
      body: "Georgia, 'Times New Roman', serif",
    },
    layout: {
      headerStyle: "banner",
      sectionStyle: "lined",
      skillsStyle: "columns",
      maxWidth: "800px",
      padding: "40px",
    },
  },

  sidebar: {
    id: "sidebar",
    name: "Creative Sidebar",
    description: "Two-column layout with colorful sidebar",
    category: "creative",
    colors: {
      primary: "#6d28d9",
      secondary: "#8b5cf6",
      background: "#ffffff",
      text: "#1f2937",
      accent: "#6d28d9",
      sidebarBg: "#6d28d9",
    },
    fonts: {
      heading: "'Segoe UI', system-ui, sans-serif",
      body: "'Segoe UI', system-ui, sans-serif",
    },
    layout: {
      headerStyle: "sidebar",
      sectionStyle: "spaced",
      skillsStyle: "tags",
      maxWidth: "900px",
      padding: "0",
    },
  },

  tech: {
    id: "tech",
    name: "Tech Developer",
    description: "Modern monospace fonts perfect for developers",
    category: "industry",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      background: "#ffffff",
      text: "#1f2937",
      accent: "#059669",
      headerBg: "#ecfdf5",
    },
    fonts: {
      heading: "'Fira Code', 'Consolas', monospace",
      body: "'Fira Code', 'Consolas', monospace",
    },
    layout: {
      headerStyle: "left",
      sectionStyle: "boxed",
      skillsStyle: "tags",
      maxWidth: "800px",
      padding: "40px",
    },
  },

  academic: {
    id: "academic",
    name: "Academic CV",
    description: "Formal design for researchers and professors",
    category: "industry",
    colors: {
      primary: "#1e3a5f",
      secondary: "#3d5a80",
      background: "#ffffff",
      text: "#1f2937",
      accent: "#1e3a5f",
    },
    fonts: {
      heading: "'Times New Roman', Times, serif",
      body: "'Times New Roman', Times, serif",
    },
    layout: {
      headerStyle: "centered",
      sectionStyle: "lined",
      skillsStyle: "list",
      maxWidth: "800px",
      padding: "48px",
    },
  },

  healthcare: {
    id: "healthcare",
    name: "Healthcare Professional",
    description: "Clean and trustworthy design for medical professionals",
    category: "industry",
    colors: {
      primary: "#0e7490",
      secondary: "#06b6d4",
      background: "#ffffff",
      text: "#1f2937",
      accent: "#0e7490",
      headerBg: "#ecfeff",
    },
    fonts: {
      heading: "'Segoe UI', Tahoma, sans-serif",
      body: "'Segoe UI', Tahoma, sans-serif",
    },
    layout: {
      headerStyle: "left",
      sectionStyle: "boxed",
      skillsStyle: "list",
      maxWidth: "800px",
      padding: "40px",
    },
  },

  marketing: {
    id: "marketing",
    name: "Marketing Creative",
    description: "Vibrant and eye-catching for creative professionals",
    category: "creative",
    colors: {
      primary: "#db2777",
      secondary: "#f472b6",
      background: "#ffffff",
      text: "#1f2937",
      accent: "#db2777",
      headerBg: "#fdf2f8",
    },
    fonts: {
      heading: "'Poppins', 'Helvetica Neue', sans-serif",
      body: "'Open Sans', Arial, sans-serif",
    },
    layout: {
      headerStyle: "banner",
      sectionStyle: "spaced",
      skillsStyle: "tags",
      maxWidth: "800px",
      padding: "40px",
    },
  },

  finance: {
    id: "finance",
    name: "Finance Conservative",
    description: "Professional and conservative for banking and finance",
    category: "industry",
    colors: {
      primary: "#1e40af",
      secondary: "#3b82f6",
      background: "#ffffff",
      text: "#1f2937",
      accent: "#1e40af",
    },
    fonts: {
      heading: "'Times New Roman', Times, serif",
      body: "Arial, sans-serif",
    },
    layout: {
      headerStyle: "centered",
      sectionStyle: "lined",
      skillsStyle: "columns",
      maxWidth: "800px",
      padding: "40px",
    },
  },

  startup: {
    id: "startup",
    name: "Startup Modern",
    description: "Trendy and innovative for startup environments",
    category: "modern",
    colors: {
      primary: "#ea580c",
      secondary: "#fb923c",
      background: "#ffffff",
      text: "#1f2937",
      accent: "#ea580c",
      headerBg: "#fff7ed",
    },
    fonts: {
      heading: "'Montserrat', 'Helvetica Neue', sans-serif",
      body: "'Open Sans', Arial, sans-serif",
    },
    layout: {
      headerStyle: "left",
      sectionStyle: "minimal",
      skillsStyle: "tags",
      maxWidth: "800px",
      padding: "40px",
    },
  },

  twocolumn: {
    id: "twocolumn",
    name: "Two-Column Compact",
    description: "Efficient use of space with side-by-side layout",
    category: "modern",
    colors: {
      primary: "#475569",
      secondary: "#64748b",
      background: "#ffffff",
      text: "#1f2937",
      accent: "#475569",
    },
    fonts: {
      heading: "'Helvetica Neue', Arial, sans-serif",
      body: "'Helvetica Neue', Arial, sans-serif",
    },
    layout: {
      headerStyle: "centered",
      sectionStyle: "minimal",
      skillsStyle: "columns",
      maxWidth: "900px",
      padding: "32px",
    },
  },
};

export const getTemplateById = (id: TemplateType): TemplateConfig => {
  return templates[id] || templates.classic;
};

export const getTemplatesByCategory = (
  category: TemplateConfig["category"],
) => {
  return Object.values(templates).filter((t) => t.category === category);
};

export const getAllTemplates = () => {
  return Object.values(templates);
};
