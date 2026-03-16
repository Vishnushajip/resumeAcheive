"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { cvService } from "@/services/cv.service";
import { Button } from "@/components/ui/Button";
import {
  Plus,
  FileText,
  Loader2,
  Trash2,
  Download,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ResumesPage() {
  const user = useAuthStore((state) => state.user);
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await cvService.getUserCVs();
      const fetchedResumes =
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

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl font-sans">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter font-outfit">
            My Resumes
          </h1>
          <p className="text-zinc-500 font-medium mt-1">
            Manage and edit your professional documents
          </p>
        </div>
        <Link href="/dashboard/builder">
          <Button className="h-14 px-6 rounded-xl font-bold gap-2">
            <Plus className="h-5 w-5" />
            Create New
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
          <p className="text-zinc-500 font-bold">Fetching your resumes...</p>
        </div>
      ) : resumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume, i) => (
            <div
              key={resume.id}
              className="group bg-white border border-zinc-100 rounded-3xl p-6 hover:shadow-xl transition-all relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {resume.atsScore || "0"} ATS
                  </span>
                  <button
                    onClick={(e) => handleDelete(resume.id, e)}
                    className="p-1.5 text-zinc-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <h3 className="font-black text-xl mb-1 truncate">
                {resume.title || `Untitled Resume`}
              </h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6">
                Modified{" "}
                {resume.updatedAt
                  ? new Date(resume.updatedAt).toLocaleDateString()
                  : "Recently"}
              </p>

              <div className="flex gap-3 mt-auto">
                <Link
                  href={`/dashboard/output?id=${resume.id}`}
                  className="flex-1"
                >
                  <Button className="w-full h-12 text-sm font-black rounded-xl gap-2 shadow-lg shadow-primary/20 bg-zinc-900 hover:bg-black transition-all">
                    <ExternalLink className="h-4 w-4" />
                    VIEW & CUSTOMIZE
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[3rem] p-20 text-center">
          <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <FileText className="h-10 w-10 text-zinc-300" />
          </div>
          <h2 className="text-2xl font-black text-zinc-900 mb-2">
            No Saved Resumes
          </h2>
          <p className="text-zinc-500 max-w-sm mx-auto mb-8 font-medium">
            Your cloud-saved resumes will appear here. Start by creating a new
            one or importing data.
          </p>
          <Link href="/dashboard/builder">
            <Button size="lg" className="rounded-2xl px-10 font-bold">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
