"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { cvService } from "@/services/cv.service";
import { Button } from "@/components/ui/Button";
import {
  Plus,
  FileText,
  TrendingUp,
  History,
  Upload,
  Sparkles,
  Loader2,
  Trash2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await cvService.getUserCVs();
      let fetchedResumes =
        response.data ||
        response.cvs ||
        (Array.isArray(response) ? response : []);
      setResumes(fetchedResumes);
    } catch {
      toast.error("Failed to load your resumes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [user?.id]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      await cvService.deleteCV(id);
      toast.success("Resume deleted successfully");
      fetchResumes();
    } catch (error) {
      toast.error("Failed to delete resume");
    }
  };

  const getScore = (resume: any) => {
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
  };

  const averageScore =
    resumes.length > 0
      ? Math.round(
          resumes.reduce((acc, resume) => acc + getScore(resume), 0) /
            resumes.length,
        )
      : 0;

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl font-sans">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-16 animate-fade-in">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter font-outfit">
            Hello, {user?.email?.split("@")[0] || "User"}!
          </h1>
          <p className="text-zinc-500 text-xl font-medium mt-2">
            Ready to optimize your professional presence?
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/dashboard/builder">
            <Button className="h-16 px-8 rounded-2xl font-black bg-primary shadow-xl shadow-primary/20 text-lg uppercase tracking-tighter flex items-center gap-3 transition-all hover:scale-105 active:scale-95 group">
              <Plus className="h-6 w-6" />
              Build New CV
            </Button>
          </Link>
          <Link href="/dashboard/upload">
            <Button
              variant="outline"
              className="h-16 px-8 rounded-2xl font-black border-2 text-lg uppercase tracking-tighter flex items-center gap-3"
            >
              <Upload className="h-6 w-6" />
              Import Data
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 animate-slide-up">
        <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl transition-all">
          <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
            <FileText className="h-7 w-7 text-blue-600" />
          </div>
          <h3 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] mb-2 font-outfit">
            Saved Resumes
          </h3>
          <p className="text-5xl font-black tracking-tighter">
            {loading ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
              resumes.length
            )}
          </p>
        </div>
        <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl transition-all">
          <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
            <TrendingUp className="h-7 w-7 text-emerald-600" />
          </div>
          <h3 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] mb-2 font-outfit">
            Average Score
          </h3>
          <p className="text-5xl font-black tracking-tighter text-emerald-600">
            {averageScore}
            <span className="text-2xl">%</span>
          </p>
        </div>
        <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl transition-all">
          <div className="h-14 w-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
            <Sparkles className="h-7 w-7 text-purple-600" />
          </div>
          <h3 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] mb-2 font-outfit">
            AI Suggestions
          </h3>
          <p className="text-5xl font-black tracking-tighter">18</p>
        </div>
      </div>

      <div className="space-y-8 animate-slide-up">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black font-outfit tracking-tighter">
            Recent Projects
          </h2>
          <Link href="/resumes">
            <Button
              variant="ghost"
              className="font-bold text-primary flex items-center gap-2"
            >
              See All
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Loading your resumes...</p>
            </div>
          ) : resumes.length > 0 ? (
            resumes.slice(0, 6).map((resume, i) => (
              <div
                key={resume.id}
                className="group relative bg-white border border-zinc-100 rounded-[3rem] p-8 hover:border-primary transition-all cursor-pointer shadow-sm hover:shadow-2xl overflow-hidden"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="bg-zinc-50 h-16 w-16 rounded-[1.5rem] flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <FileText className="h-8 w-8 text-zinc-400 group-hover:text-primary" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="h-10 px-4 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-black flex items-center whitespace-nowrap">
                      {getScore(resume)} ATS SCORE
                    </div>
                    <button
                      onClick={(e) => handleDelete(resume.id, e)}
                      className="p-2 text-zinc-300 hover:text-red-500 transition-colors"
                      title="Delete Resume"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <h4 className="font-black text-2xl font-outfit mb-1 tracking-tight truncate pr-4">
                  {resume.title || `Resume #${i + 1}`}
                </h4>
                <p className="text-zinc-500 font-bold text-sm mb-8 uppercase tracking-widest">
                  {resume.createdAt
                    ? new Date(resume.createdAt).toLocaleDateString()
                    : "Unknown Date"}
                </p>
                <div className="flex gap-4">
                  <Link
                    href={`/dashboard/output?id=${resume.id}&mode=design`}
                    className="flex-1"
                  >
                    <Button className="w-full h-12 rounded-xl text-xs font-black uppercase tracking-widest bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-200">
                      DESIGN CV
                    </Button>
                  </Link>
                  <Link
                    href={`/dashboard/builder?id=${resume.id}`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-xl text-xs font-black uppercase tracking-widest"
                    >
                      EDIT DATA
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-4">
                No resumes yet. Create your first resume to get started!
              </p>
              <Link href="/dashboard/builder">
                <Button>Create Your First Resume</Button>
              </Link>
            </div>
          )}

          <Link
            href="/dashboard/builder"
            className="group border-[3px] border-dashed border-zinc-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-zinc-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all"
          >
            <div className="h-20 w-20 rounded-full bg-zinc-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Plus className="h-10 w-10 opacity-50" />
            </div>
            <span className="font-black font-outfit text-xl uppercase tracking-tighter">
              Generate New Resume
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
