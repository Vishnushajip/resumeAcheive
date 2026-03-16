"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { cvService } from "@/services/cv.service";
import { Button } from "@/components/ui/Button";
import {
  Plus,
  FileText,
  TrendingUp,
  Upload,
  Sparkles,
  Loader2,
  Trash2,
  ArrowRight,
  MoreVertical,
  Edit3,
  Palette,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function getScore(resume: any): number {
  if (resume.atsScore) return parseInt(resume.atsScore);
  try {
    const data =
      typeof resume.cvData === "string"
        ? JSON.parse(resume.cvData)
        : resume.cvData;
    return parseInt(data?.atsData?.score || data?.score || "0");
  } catch {
    return 0;
  }
}

function ScoreRing({ score }: { score: number }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" className="shrink-0">
      <circle
        cx="26"
        cy="26"
        r={r}
        fill="none"
        stroke="#f3f4f6"
        strokeWidth="5"
      />
      <circle
        cx="26"
        cy="26"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        transform="rotate(-90 26 26)"
      />
      <text
        x="26"
        y="30"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill={color}
      >
        {score}
      </text>
    </svg>
  );
}

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const firstName = user?.email?.split("@")[0] || "there";

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const res = await cvService.getUserCVs();
      const list = res.data || res.cvs || (Array.isArray(res) ? res : []);
      setResumes(list);
    } catch {
      toast.error("Failed to load your resumes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [user?.id]);

  useEffect(() => {
    const handler = () => setMenuOpen(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(null);
    if (!confirm("Delete this resume?")) return;
    try {
      await cvService.deleteCV(id);
      toast.success("Resume deleted");
      fetchResumes();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const averageScore =
    resumes.length > 0
      ? Math.round(
          resumes.reduce((a, r) => a + getScore(r), 0) / resumes.length,
        )
      : 0;

  const STATS = [
    {
      icon: FileText,
      label: "Resumes",
      value: loading ? "—" : String(resumes.length),
      accent: "#6366f1",
      bg: "#eef2ff",
    },
    {
      icon: TrendingUp,
      label: "Avg. ATS",
      value: loading ? "—" : `${averageScore}%`,
      accent: "#10b981",
      bg: "#f0fdf4",
    },
    {
      icon: Sparkles,
      label: "AI tips",
      value: "18",
      accent: "#f59e0b",
      bg: "#fffbeb",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-20 sm:pt-12">
        <div className="flex items-start justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">
              Dashboard
            </p>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-none">
              Hello, {firstName}
              <span className="text-indigo-500">.</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-400 mt-1 hidden sm:block">
              Ready to land your next role?
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              href="/dashboard/upload"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-gray-300 transition-all"
            >
              <Upload className="h-4 w-4" />
              Import CV
            </Link>
            <Link
              href="/dashboard/builder"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all shadow-sm shadow-indigo-200"
            >
              <Plus className="h-4 w-4" />
              New resume
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {STATS.map(({ icon: Icon, label, value, accent, bg }) => (
            <div
              key={label}
              className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-6"
            >
              <div
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4"
                style={{ background: bg }}
              >
                <Icon
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  style={{ color: accent }}
                />
              </div>
              <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                {label}
              </p>
              <p
                className="text-xl sm:text-3xl font-extrabold tracking-tight"
                style={{ color: accent }}
              >
                {loading ? (
                  <Loader2
                    className="h-5 w-5 animate-spin"
                    style={{ color: accent }}
                  />
                ) : (
                  value
                )}
              </p>
            </div>
          ))}
        </div>

        {/* ── RESUME SECTION ───────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base sm:text-xl font-extrabold text-gray-900 tracking-tight">
            Your resumes
          </h2>
          <Link
            href="/resumes"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="h-8 w-8 animate-spin mb-3" />
            <p className="text-sm">Loading your resumes…</p>
          </div>
        ) : resumes.length === 0 ? (
          /* ── EMPTY STATE ── */
          <div className="flex flex-col items-center justify-center text-center py-16 px-8 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="h-16 w-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-1">
              No resumes yet
            </h3>
            <p className="text-sm text-gray-400 max-w-xs mb-6">
              Create your first AI-powered resume in under 3 minutes.
            </p>
            <Link
              href="/dashboard/builder"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all"
            >
              <Plus className="h-4 w-4" />
              Create first resume
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {resumes.slice(0, 6).map((resume, i) => {
              const score = getScore(resume);
              const dateStr = resume.createdAt
                ? new Date(resume.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Unknown date";
              const isOpen = menuOpen === resume.id;

              return (
                <div
                  key={resume.id}
                  className="relative bg-white rounded-2xl sm:rounded-3xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Card top accent */}
                  <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500" />

                  <div className="p-5 sm:p-6">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                          <FileText className="h-5 w-5 text-indigo-400" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-sm sm:text-base text-gray-900 truncate leading-tight">
                            {resume.title || `Resume #${i + 1}`}
                          </h4>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {dateStr}
                          </p>
                        </div>
                      </div>

                      {/* Context menu */}
                      <div className="relative shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpen(isOpen ? null : resume.id);
                          }}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {isOpen && (
                          <div className="absolute right-0 top-8 z-20 bg-white border border-gray-100 rounded-xl shadow-lg py-1 w-40 text-sm">
                            <Link
                              href={`/dashboard/output?id=${resume.id}&mode=design`}
                              className="flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 text-gray-700"
                            >
                              <Palette className="h-3.5 w-3.5 text-amber-500" />
                              Design CV
                            </Link>
                            <Link
                              href={`/dashboard/builder?id=${resume.id}`}
                              className="flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 text-gray-700"
                            >
                              <Edit3 className="h-3.5 w-3.5 text-indigo-500" />
                              Edit data
                            </Link>
                            <div className="mx-2 my-1 h-px bg-gray-100" />
                            <button
                              onClick={(e) => handleDelete(resume.id, e)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-red-50 text-red-500"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ATS score ring + label */}
                    <div className="flex items-center gap-3 mb-5">
                      <ScoreRing score={score} />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          ATS score
                        </p>
                        <p className="text-xs text-gray-500">
                          {score >= 80
                            ? "Excellent — ready to send"
                            : score >= 60
                              ? "Good — a few tweaks needed"
                              : "Needs improvement"}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/dashboard/output?id=${resume.id}&mode=design`}
                      >
                        <button className="w-full py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold border border-amber-100 transition-colors flex items-center justify-center gap-1.5">
                          <Palette className="h-3.5 w-3.5" />
                          Design
                        </button>
                      </Link>
                      <Link href={`/dashboard/builder?id=${resume.id}`}>
                        <button className="w-full py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-100 transition-colors flex items-center justify-center gap-1.5">
                          <Edit3 className="h-3.5 w-3.5" />
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            <Link
              href="/dashboard/builder"
              className="group flex flex-col items-center justify-center gap-3 bg-white border-2 border-dashed border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/40 rounded-2xl sm:rounded-3xl p-8 text-center transition-all min-h-[180px]"
            >
              <div className="h-12 w-12 rounded-2xl bg-gray-50 group-hover:bg-indigo-100 border border-gray-100 group-hover:border-indigo-200 flex items-center justify-center transition-all">
                <Plus className="h-6 w-6 text-gray-300 group-hover:text-indigo-500 transition-colors" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-gray-400 group-hover:text-indigo-600 transition-colors">
                  New resume
                </p>
                <p className="text-xs text-gray-300 group-hover:text-indigo-400 transition-colors mt-0.5">
                  AI-powered in 3 min
                </p>
              </div>
            </Link>
          </div>
        )}

        <div className="sm:hidden fixed bottom-6 right-4 z-30 flex flex-col gap-3 items-end">
          <Link
            href="/dashboard/upload"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-gray-200 shadow-lg text-sm font-semibold text-gray-700"
          >
            <Upload className="h-4 w-4" />
            Import
          </Link>
          <Link
            href="/dashboard/builder"
            className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-indigo-600 shadow-lg shadow-indigo-200 text-white text-sm font-bold"
          >
            <Plus className="h-4 w-4" />
            New resume
          </Link>
        </div>
      </div>
    </div>
  );
}
