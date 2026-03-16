import { create } from "zustand";

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
  };
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    year: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    link?: string;
  }>;
  resume?: any;
}

interface EditorState {
  resumeData: ResumeData;
  atsData: {
    score: string;
    tips: string[];
    missingKeywords: string[];
  } | null;
  setResumeData: (data: Partial<ResumeData>) => void;
  setAtsData: (data: EditorState["atsData"]) => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  resume: undefined,
};

export const useEditorStore = create<EditorState>((set) => ({
  resumeData: initialResumeData,
  atsData: null,
  setResumeData: (data) =>
    set((state) => ({
      resumeData: { ...state.resumeData, ...data },
    })),
  setAtsData: (data) => set({ atsData: data }),
}));
