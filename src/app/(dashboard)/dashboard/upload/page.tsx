"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWorker } from "tesseract.js";
import { Button } from "@/components/ui/Button";
import {
  Upload,
  Loader2,
  CheckCircle2,
  X,
  FileSearch,
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { aiService } from "@/services/ai.service";
import { cvService } from "@/services/cv.service";
import { useEditorStore } from "@/store/editor.store";
import { toast } from "sonner";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "extracting" | "parsing" | "done"
  >("idle");
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const setResumeData = useEditorStore((state) => state.setResumeData);
  const setAtsData = useEditorStore((state) => state.setAtsData);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("PDFs are not supported. Please upload an image.");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const processImage = async () => {
    if (!preview) return;
    setStatus("extracting");
    setProgress(0);

    try {
      const worker = await createWorker("eng", 1, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.floor(m.progress * 100));
          }
        },
      });

      const ret = await worker.recognize(preview);
      const text = ret.data.text;
      await worker.terminate();

      setStatus("parsing");

      const aiResponse = await aiService.generateResume({ rawText: text });

      const structuredData = {
        ...aiResponse.resume,
        resume: aiResponse.resume,
      };

      setResumeData(structuredData);

      try {
        await cvService.createCV({
          title:
            aiResponse.resume?.personalInfo?.fullName + " - Extracted" ||
            "Extracted CV",
          cvData: structuredData,
          isActive: true,
        });
      } catch {
        // Auto-save failed silently
      }

      setAtsData({
        score: (aiResponse.atsScore || "0").toString(),
        tips: aiResponse.optimizationTips || [],
        missingKeywords: aiResponse.missingKeywords || [],
      });

      setStatus("done");
      toast.success("Resume data extracted and optimized successfully!");

      setTimeout(() => {
        router.push("/dashboard/output");
      }, 1500);
    } catch (error) {
      toast.error("Extraction failed. Please try a clearer image.");
      setStatus("idle");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[calc(100vh-80px)] font-sans">
      <div className="text-center space-y-4 mb-20 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-black font-outfit tracking-tighter">
          Upload <span className="text-primary">Existing</span> CV
        </h1>
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium">
          Our client-side engine extracts text and rebuilds your resume using
          advanced AI models.
        </p>
      </div>

      <div
        className={`
        relative border-[6px] border-dashed rounded-[4rem] p-16 transition-all text-center group
        ${file ? "border-primary bg-primary/5" : "border-zinc-200 hover:border-primary/40 bg-white"}
      `}
      >
        {file ? (
          <div className="space-y-10 animate-in zoom-in-95 duration-500">
            <div className="relative inline-block">
              {preview && (
                <img
                  src={preview}
                  alt="CV Preview"
                  className="h-64 w-48 object-cover rounded-3xl shadow-2xl border-4 border-white mx-auto transition-transform group-hover:scale-105"
                />
              )}
              <Button
                variant="destructive"
                size="sm"
                className="absolute -top-4 -right-4 h-12 w-12 rounded-full p-0 shadow-lg"
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setStatus("idle");
                }}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="space-y-2">
              <p className="font-black text-2xl font-outfit">{file.name}</p>
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">
                {(file.size / 1024 / 1024).toFixed(2)} MB • READY TO ANALYZE
              </p>
            </div>

            {status === "idle" ? (
              <Button
                size="lg"
                className="w-full h-20 text-xl font-black rounded-[2rem] bg-primary shadow-xl shadow-primary/30 uppercase tracking-widest"
                onClick={processImage}
              >
                Analyze & Rebuild
              </Button>
            ) : (
              <div className="space-y-6 pt-4 max-w-md mx-auto">
                <div className="w-full bg-zinc-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-center gap-4 text-primary font-black text-lg font-outfit uppercase tracking-tighter">
                  {status === "extracting" && (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" /> Extracting
                      Text ({progress}%)
                    </>
                  )}
                  {status === "parsing" && (
                    <>
                      <Sparkles className="h-6 w-6 animate-pulse" /> AI
                      Structuring Content...
                    </>
                  )}
                  {status === "done" && (
                    <>
                      <CheckCircle2 className="h-6 w-6" /> Success!
                      Redirecting...
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center gap-8 py-20">
              <div className="h-32 w-32 rounded-[2.5rem] bg-primary/10 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-zinc-50">
                <Upload className="h-12 w-12" />
              </div>
              <div className="space-y-3">
                <p className="text-3xl font-black font-outfit tracking-tight">
                  Drop your CV here
                </p>
                <p className="text-zinc-500 font-medium text-lg italic">
                  Supports HD Images (PNG, JPG)
                </p>
              </div>
              <Button
                variant="outline"
                className="pointer-events-none px-10 h-14 rounded-2xl border-2 font-bold uppercase tracking-widest"
              >
                Select From Folder
              </Button>
            </div>
          </label>
        )}
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex gap-6 p-10 bg-white border border-zinc-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-shadow">
          <div className="h-16 w-16 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-black font-outfit mb-3">
              Privacy First
            </h3>
            <p className="text-zinc-500 font-medium leading-relaxed">
              OCR runs entirely in your browser. Your documents never hit our
              servers during extraction.
            </p>
          </div>
        </div>
        <div className="flex gap-6 p-10 bg-white border border-zinc-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-shadow">
          <div className="h-16 w-16 bg-amber-500/10 rounded-2xl flex items-center justify-center shrink-0">
            <Zap className="h-8 w-8 text-amber-600" />
          </div>
          <div>
            <h3 className="text-2xl font-black font-outfit mb-3">
              Instant Capture
            </h3>
            <p className="text-zinc-500 font-medium leading-relaxed">
              Our AI recognizes professional experience, education, and skills
              with 99% accuracy across industries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
