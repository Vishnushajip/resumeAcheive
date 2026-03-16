"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cvService } from "@/services/cv.service";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  FileCheck,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Loader2,
  Target,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { useEditorStore } from "@/store/editor.store";
import { aiService } from "@/services/ai.service";
import { toast } from "sonner";

const builderSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone is required"),
    location: z.string().min(1, "Location is required"),
    title: z.string().min(1, "Job title is required"),
  }),
  experience: z
    .array(
      z.object({
        company: z.string().min(1, "Company is required"),
        position: z.string().min(1, "Position is required"),
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().min(1, "End date is required"),
        description: z
          .string()
          .min(10, "Description must be at least 10 characters"),
      }),
    )
    .min(1),
  education: z
    .array(
      z.object({
        school: z.string().min(1, "School is required"),
        degree: z.string().min(1, "Degree is required"),
        year: z.string().min(1, "Year is required"),
      }),
    )
    .min(1),
  skills: z.string().min(1, "Skills are required"),
  jobDescription: z
    .string()
    .min(1, "Job description is required for optimization"),
});

type FormValues = z.infer<typeof builderSchema>;

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      }
    >
      <BuilderContent />
    </Suspense>
  );
}

function BuilderContent() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorDetails, setErrorDetails] = useState<{
    title: string;
    message: string;
    type: "auth" | "network" | "server" | "unknown";
  } | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");
  const { user, isAuthenticated } = useAuthStore();
  const { resumeData, setResumeData, setAtsData } = useEditorStore();

  useEffect(() => {
    if (resumeId) {
      const fetchExistingResume = async () => {
        try {
          const data = await cvService.getCV(resumeId);
          const rawCV =
            data.cv || data.cvData ? data.cv?.cvData || data.cvData : data;

          if (rawCV) {
            setResumeData(rawCV);
          }
        } catch {
          toast.error("Failed to load existing resume");
        }
      };
      fetchExistingResume();
    }
  }, [resumeId, setResumeData]);

  if (!isAuthenticated || !user) {
    router.push("/login");
    return null;
  }

  const {
    register,
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(builderSchema),
    defaultValues: {
      personalInfo: resumeData.personalInfo,
      experience:
        resumeData.experience.length > 0
          ? resumeData.experience.map((exp) => ({
              company: exp.company,
              position: exp.position,
              startDate: exp.startDate,
              endDate: exp.endDate,
              description: exp.description,
            }))
          : [
              {
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                description: "",
              },
            ],
      education:
        resumeData.education.length > 0
          ? resumeData.education.map((edu) => ({
              school: edu.school,
              degree: edu.degree,
              year: edu.year,
            }))
          : [{ school: "", degree: "", year: "" }],
      skills: Array.isArray(resumeData.skills)
        ? resumeData.skills.join(", ")
        : "",
      jobDescription: "",
    },
  });

  useEffect(() => {
    if (resumeData) {
      reset({
        personalInfo: resumeData.personalInfo,
        experience:
          resumeData.experience.length > 0
            ? resumeData.experience.map((exp: any) => ({
                company: exp.company,
                position: exp.position,
                startDate: exp.startDate,
                endDate: exp.endDate,
                description: exp.description,
              }))
            : [
                {
                  company: "",
                  position: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                },
              ],
        education:
          resumeData.education.length > 0
            ? resumeData.education.map((edu: any) => ({
                school: edu.school,
                degree: edu.degree,
                year: edu.year,
              }))
            : [{ school: "", degree: "", year: "" }],
        skills: Array.isArray(resumeData.skills)
          ? resumeData.skills.join(", ")
          : "",
        jobDescription: "",
      });
    }
  }, [resumeData, reset]);

  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control, name: "experience" });
  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({ control, name: "education" });

  const stepFieldsMap: Record<number, Parameters<typeof trigger>[0]> = {
    1: [
      "personalInfo.fullName",
      "personalInfo.email",
      "personalInfo.phone",
      "personalInfo.location",
      "personalInfo.title",
    ],
    2: "experience",
    3: "education",
    4: "skills",
    5: "jobDescription",
  };

  const handleNext = async () => {
    const isValid = await trigger(stepFieldsMap[step]);
    if (!isValid) {
      toast.error("Please fix the highlighted errors before continuing.");
      return;
    }
    setStep((s) => Math.min(5, s + 1));
  };

  const onSubmit = async (data: FormValues) => {
    setIsGenerating(true);
    setErrorDetails(null);
    toast.loading("AI is optimizing your resume...", { id: "optimize" });

    try {
      const skillsArray = data.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const structuredData = { ...data, skills: skillsArray };

      const aiResponse = await aiService.generateResume({
        userData: structuredData,
        jobDescription: data.jobDescription,
      });

      if (!aiResponse.atsScore) {
        throw new Error("Invalid response from optimization service.");
      }

      setResumeData({ ...structuredData, resume: aiResponse.resume });
      setAtsData({
        score: aiResponse.atsScore,
        tips: aiResponse.optimizationTips || [],
        missingKeywords: aiResponse.missingKeywords || [],
      });

      toast.success(`Resume optimized! ATS Score: ${aiResponse.atsScore}%`, {
        id: "optimize",
      });
      router.push("/dashboard/output");
    } catch (error: any) {
      const status = error.response?.status as number | undefined;

      if (status === 401 || status === 403) {
        setErrorDetails({
          title: status === 401 ? "Session Expired" : "Access Denied",
          message:
            status === 401
              ? "Your session has expired. Redirecting to login..."
              : "You don't have permission to access this feature.",
          type: "auth",
        });
        toast.error(
          status === 401
            ? "Session expired. Please login again."
            : "Access denied.",
          { id: "optimize" },
        );
        if (status === 401) setTimeout(() => router.push("/login"), 2500);
      } else if (
        status === 404 ||
        error.code === "ECONNREFUSED" ||
        error.message?.includes("Network Error")
      ) {
        setErrorDetails({
          title: "Service Unavailable",
          message:
            "The optimization service is currently unreachable. Please try again later.",
          type: "network",
        });
        toast.error("Cannot connect to the optimization service.", {
          id: "optimize",
        });
      } else if (status !== undefined && status >= 500) {
        setErrorDetails({
          title: "Server Error",
          message:
            "The optimization service is experiencing issues. Please try again shortly.",
          type: "server",
        });
        toast.error("Server error. Please try again later.", {
          id: "optimize",
        });
      } else {
        setErrorDetails({
          title: "Optimization Failed",
          message:
            error.response?.data?.message ||
            error.message ||
            "An unexpected error occurred.",
          type: "unknown",
        });
        toast.error("An unexpected error occurred.", { id: "optimize" });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const steps = [
    { name: "Identity", icon: <User className="h-5 w-5" /> },
    { name: "Journey", icon: <Briefcase className="h-5 w-5" /> },
    { name: "Knowledge", icon: <GraduationCap className="h-5 w-5" /> },
    { name: "Expertise", icon: <Code className="h-5 w-5" /> },
    { name: "Target", icon: <Target className="h-5 w-5" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl font-sans">
      <div className="mb-16">
        <div className="flex justify-between items-center relative max-w-3xl mx-auto">
          <div className="absolute top-6 left-0 w-full h-1 bg-zinc-200 -z-0" />
          <div
            className="absolute top-6 left-0 h-1 bg-primary transition-all duration-500 -z-0"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-4 relative z-10 bg-zinc-50 px-2 lg:px-4"
            >
              <div
                className={cn(
                  "h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg",
                  step > i + 1
                    ? "bg-primary text-white scale-90"
                    : step === i + 1
                      ? "bg-primary text-white scale-110 shadow-primary/30"
                      : "bg-white text-zinc-400 border border-zinc-200",
                )}
              >
                {step > i + 1 ? <FileCheck className="h-7 w-7" /> : s.icon}
              </div>
              <span
                className={cn(
                  "text-[10px] uppercase font-black tracking-[0.2em] font-outfit",
                  step === i + 1
                    ? "text-primary opacity-100"
                    : "text-zinc-400 opacity-60",
                )}
              >
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {errorDetails && (
        <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
            <div className="ml-3 flex-1">
              <h3 className="text-lg font-semibold text-red-800">
                {errorDetails.title}
              </h3>
              <p className="mt-2 text-red-700">{errorDetails.message}</p>
              <button
                onClick={() => setErrorDetails(null)}
                className="mt-4 text-sm font-medium text-red-800 hover:text-red-900"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-10 bg-white border border-zinc-100 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />

        {step === 1 && (
          <div className="space-y-10 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-4xl font-black font-outfit tracking-tighter">
                Your Identity
              </h2>
              <p className="text-zinc-500 font-medium text-lg italic">
                Let recruiters know who you are and where you are headed.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-zinc-400">
                  Full Name
                </label>
                <Input
                  className={cn(
                    "h-16 rounded-2xl bg-zinc-50 border-none focus:ring-primary font-bold text-lg",
                    errors.personalInfo?.fullName && "bg-red-50",
                  )}
                  placeholder="e.g. Alex Johnson"
                  {...register("personalInfo.fullName")}
                />
                {errors.personalInfo?.fullName && (
                  <p className="text-red-600 text-sm font-medium">
                    {errors.personalInfo.fullName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-zinc-400">
                  Professional Title
                </label>
                <Input
                  className={cn(
                    "h-16 rounded-2xl bg-zinc-50 border-none focus:ring-primary font-bold text-lg",
                    errors.personalInfo?.title && "bg-red-50",
                  )}
                  placeholder="e.g. Senior Full Stack Engineer"
                  {...register("personalInfo.title")}
                />
                {errors.personalInfo?.title && (
                  <p className="text-red-600 text-sm font-medium">
                    {errors.personalInfo.title.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-zinc-400">
                  Email Address
                </label>
                <Input
                  className={cn(
                    "h-16 rounded-2xl bg-zinc-50 border-none focus:ring-primary font-bold text-lg",
                    errors.personalInfo?.email && "bg-red-50",
                  )}
                  placeholder="e.g. alex.johnson@gmail.com"
                  type="email"
                  {...register("personalInfo.email")}
                />
                {errors.personalInfo?.email && (
                  <p className="text-red-600 text-sm font-medium">
                    {errors.personalInfo.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-zinc-400">
                  Phone
                </label>
                <Input
                  className={cn(
                    "h-16 rounded-2xl bg-zinc-50 border-none focus:ring-primary font-bold text-lg",
                    errors.personalInfo?.phone && "bg-red-50",
                  )}
                  placeholder="e.g. +91 98765 43210"
                  {...register("personalInfo.phone")}
                />
                {errors.personalInfo?.phone && (
                  <p className="text-red-600 text-sm font-medium">
                    {errors.personalInfo.phone.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-black uppercase tracking-widest text-zinc-400">
                  Home Base
                </label>
                <Input
                  className={cn(
                    "h-16 rounded-2xl bg-zinc-50 border-none focus:ring-primary font-bold text-lg",
                    errors.personalInfo?.location && "bg-red-50",
                  )}
                  placeholder="e.g. Bangalore, India"
                  {...register("personalInfo.location")}
                />
                {errors.personalInfo?.location && (
                  <p className="text-red-600 text-sm font-medium">
                    {errors.personalInfo.location.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-fade-in text-zinc-500">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <h2 className="text-4xl font-black font-outfit tracking-tighter text-zinc-950">
                  Professional Journey
                </h2>
                <p className="font-medium text-lg italic">
                  Showcase your career growth and high-impact achievements.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="rounded-2xl border-2 font-bold transition-all hover:bg-primary hover:text-white"
                onClick={() =>
                  appendExp({
                    company: "",
                    position: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  })
                }
              >
                <Plus className="mr-2 h-5 w-5" /> Add Role
              </Button>
            </div>
            <div className="space-y-8">
              {expFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-10 border border-zinc-100 rounded-[2.5rem] space-y-6 relative bg-zinc-50/50 hover:bg-white transition-all hover:shadow-xl group"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute top-6 right-6 text-zinc-300 hover:text-destructive opacity-0 group-hover:opacity-100 transition-all"
                    onClick={() => removeExp(index)}
                  >
                    <Trash2 className="h-6 w-6" />
                  </Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Input
                        className={cn(
                          "h-14 rounded-xl border-none bg-white font-bold",
                          errors.experience?.[index]?.company && "bg-red-50",
                        )}
                        placeholder="e.g. Google, Infosys, Startup Inc."
                        {...register(`experience.${index}.company` as const)}
                      />
                      {errors.experience?.[index]?.company && (
                        <p className="text-red-600 text-sm font-medium">
                          {errors.experience[index].company.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Input
                        className={cn(
                          "h-14 rounded-xl border-none bg-white font-bold",
                          errors.experience?.[index]?.position && "bg-red-50",
                        )}
                        placeholder="e.g. Software Engineer II"
                        {...register(`experience.${index}.position` as const)}
                      />
                      {errors.experience?.[index]?.position && (
                        <p className="text-red-600 text-sm font-medium">
                          {errors.experience[index].position.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Input
                        className={cn(
                          "h-14 rounded-xl border-none bg-white font-medium",
                          errors.experience?.[index]?.startDate && "bg-red-50",
                        )}
                        placeholder="e.g. Jan 2022"
                        {...register(`experience.${index}.startDate` as const)}
                      />
                      {errors.experience?.[index]?.startDate && (
                        <p className="text-red-600 text-sm font-medium">
                          {errors.experience[index].startDate.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Input
                        className={cn(
                          "h-14 rounded-xl border-none bg-white font-medium",
                          errors.experience?.[index]?.endDate && "bg-red-50",
                        )}
                        placeholder="e.g. Dec 2023 or Present"
                        {...register(`experience.${index}.endDate` as const)}
                      />
                      {errors.experience?.[index]?.endDate && (
                        <p className="text-red-600 text-sm font-medium">
                          {errors.experience[index].endDate.message}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Textarea
                        className={cn(
                          "rounded-2xl p-6 min-h-[150px] border-none bg-white font-medium text-zinc-900 placeholder:text-zinc-400",
                          errors.experience?.[index]?.description &&
                            "bg-red-50",
                        )}
                        placeholder="e.g. Led migration of monolith to microservices, reducing deployment time by 40% and improving uptime to 99.9%"
                        {...register(
                          `experience.${index}.description` as const,
                        )}
                      />
                      {errors.experience?.[index]?.description && (
                        <p className="text-red-600 text-sm font-medium">
                          {errors.experience[index].description.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10 animate-fade-in">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <h2 className="text-4xl font-black font-outfit tracking-tighter">
                  Academic Foundation
                </h2>
                <p className="text-zinc-500 font-medium text-lg italic">
                  Your educational milestones and certifications.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="rounded-2xl border-2 font-bold"
                onClick={() => appendEdu({ school: "", degree: "", year: "" })}
              >
                <Plus className="mr-2 h-5 w-5" /> Add School
              </Button>
            </div>
            <div className="space-y-6">
              {eduFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-10 border border-zinc-100 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-50/50 shadow-sm relative group"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute top-4 right-4 text-zinc-300 hover:text-destructive opacity-0 group-hover:opacity-100 transition-all"
                    onClick={() => removeEdu(index)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                  <div className="space-y-2">
                    <Input
                      className={cn(
                        "h-14 rounded-xl border-none bg-white font-bold",
                        errors.education?.[index]?.school && "bg-red-50",
                      )}
                      placeholder="e.g. IIT Bombay, MIT"
                      {...register(`education.${index}.school` as const)}
                    />
                    {errors.education?.[index]?.school && (
                      <p className="text-red-600 text-sm font-medium">
                        {errors.education[index].school.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Input
                      className={cn(
                        "h-14 rounded-xl border-none bg-white font-bold",
                        errors.education?.[index]?.degree && "bg-red-50",
                      )}
                      placeholder="e.g. B.Tech Computer Science"
                      {...register(`education.${index}.degree` as const)}
                    />
                    {errors.education?.[index]?.degree && (
                      <p className="text-red-600 text-sm font-medium">
                        {errors.education[index].degree.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Input
                      className={cn(
                        "h-14 rounded-xl border-none bg-white font-medium",
                        errors.education?.[index]?.year && "bg-red-50",
                      )}
                      placeholder="e.g. 2022"
                      {...register(`education.${index}.year` as const)}
                    />
                    {errors.education?.[index]?.year && (
                      <p className="text-red-600 text-sm font-medium">
                        {errors.education[index].year.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-10 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-4xl font-black font-outfit tracking-tighter">
                Unique Expertise
              </h2>
              <p className="text-zinc-500 font-medium text-lg italic">
                The skills and technologies that make you a top 1% candidate.
              </p>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
                Skills (Separated by commas)
              </label>
              <Textarea
                className={cn(
                  "min-h-[200px] rounded-[2.5rem] p-10 bg-zinc-50 border-none focus:ring-primary font-black text-2xl tracking-tighter placeholder:text-zinc-300 font-outfit",
                  errors.skills && "bg-red-50",
                )}
                placeholder="e.g. TypeScript, React, Node.js, AWS, Docker, System Design..."
                {...register("skills")}
              />
              {errors.skills && (
                <p className="text-red-600 text-sm font-medium">
                  {errors.skills.message}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-10 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-4xl font-black font-outfit tracking-tighter">
                Mission Target
              </h2>
              <p className="text-zinc-500 font-medium text-lg italic">
                Paste the job description. Our AI will align your profile for
                perfect keyword matching.
              </p>
            </div>
            <Textarea
              className={cn(
                "min-h-[350px] rounded-[3rem] p-10 bg-zinc-900 text-zinc-50 border-none focus:ring-primary font-mono text-base leading-relaxed",
                errors.jobDescription && "ring-2 ring-red-500",
              )}
              placeholder="Paste the target job description here..."
              {...register("jobDescription")}
            />
            {errors.jobDescription && (
              <p className="text-red-600 text-sm font-medium">
                {errors.jobDescription.message}
              </p>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-10 border-t border-zinc-100 mt-16 relative z-10">
          <Button
            type="button"
            variant="ghost"
            className="h-16 px-10 rounded-2xl font-black font-outfit text-lg tracking-tight uppercase"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1 || isGenerating}
          >
            <ChevronLeft className="mr-2 h-6 w-6" /> Previous
          </Button>

          {step < 5 ? (
            <Button
              type="button"
              className="h-16 px-12 rounded-2xl font-black font-outfit text-lg tracking-tight bg-zinc-100 text-zinc-950 hover:bg-primary hover:text-white transition-all uppercase shadow-lg shadow-zinc-200 hover:shadow-primary/30"
              onClick={handleNext}
              disabled={isGenerating}
            >
              Continue <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="h-20 px-16 rounded-[2rem] font-black font-outfit text-xl tracking-tighter bg-gradient-to-r from-primary to-purple-600 border-none shadow-2xl shadow-primary/40 transition-all hover:scale-105 active:scale-95 text-white uppercase"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin text-white" />
                  AI Syncing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 h-6 w-6 text-white" />
                  Optimize Resume
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
