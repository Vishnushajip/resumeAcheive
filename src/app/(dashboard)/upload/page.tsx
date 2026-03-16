"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/Button";
import {
  Upload,
  FileText,
  Loader2,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  X,
  FileImage,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Tesseract from "tesseract.js";

export default function UploadPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validImageTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    processFile(selectedFile);
  };

  const processFile = (selectedFile: File | undefined) => {
    setError(null);
    setExtractedText("");

    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size too large. Please upload a file smaller than 10MB.");
      toast.error("File size too large. Maximum size is 10MB.");
      return;
    }

    const fileName = selectedFile.name.toLowerCase();
    const isPDF =
      selectedFile.type === "application/pdf" || fileName.endsWith(".pdf");
    const isImage =
      validImageTypes.includes(selectedFile.type) ||
      fileName.endsWith(".jpg") ||
      fileName.endsWith(".jpeg") ||
      fileName.endsWith(".png") ||
      fileName.endsWith(".webp");

    if (isPDF) {
      setFile(null);
      setError(
        "PDF files cannot be processed directly. Please convert your PDF to JPG or PNG format first, or take a clear photo of your resume.",
      );
      toast.error(
        "PDF not supported. Please upload an image (JPG, PNG) instead.",
      );
    } else if (isImage) {
      setFile(selectedFile);
      setError(null);
      toast.success(`File "${selectedFile.name}" selected successfully!`);
    } else {
      setFile(null);
      setError(
        "Invalid file type. Please upload an image file (JPG, PNG, WEBP).",
      );
      toast.error("Please upload a valid image file (JPG, PNG, WEBP)");
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) {
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];

      if (!validImageTypes.includes(droppedFile.type)) {
        setFile(null);
        setError(
          droppedFile.type === "application/pdf"
            ? "PDF files cannot be processed. Please convert your PDF to JPG or PNG format first, or take a clear photo of your resume."
            : "Invalid file type. Please upload an image file (JPG, PNG, WEBP).",
        );
        toast.error(
          droppedFile.type === "application/pdf"
            ? "PDF not supported. Please upload an image (JPG, PNG) instead."
            : "Invalid file type. Please upload an image.",
        );
        return;
      }
    }

    processFile(droppedFile);
  }, []);

  const clearFile = () => {
    setFile(null);
    setExtractedText("");
    setError(null);
    setExtractionProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const extractTextFromImage = async () => {
    if (!file) return;

    const isPDF =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");
    const validExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    const hasValidExtension = validExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(ext),
    );

    if (isPDF || !hasValidExtension) {
      setError(
        "PDF files cannot be processed. Please convert your PDF to JPG or PNG format first, or take a clear photo of your resume.",
      );
      toast.error(
        "PDF not supported. Please upload an image (JPG, PNG) instead.",
      );

      clearFile();
      return;
    }

    setIsExtracting(true);
    setError(null);
    setExtractionProgress(0);

    try {
      const result = await Tesseract.recognize(file, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setExtractionProgress(Math.round(m.progress * 100));
          }
        },
      });

      const text = result.data.text;
      const confidence = result.data.confidence;

      if (!text.trim()) {
        setError(
          "We couldn't read any text from this image. Please try:\n" +
            "• A clearer, higher resolution image\n" +
            "• Better lighting (avoid shadows)\n" +
            "• Make sure text is not blurry\n" +
            "• Use a plain background if possible",
        );
        return;
      }

      if (confidence < 50) {
        toast.warning(
          "Low image quality detected. Some text may not be accurate.",
        );
      }

      setExtractedText(text);
      setExtractionProgress(100);
      toast.success("Text extracted successfully! Generating your resume...");

      await autoGenerateCV(text);
    } catch (error: any) {
      console.error("OCR Error:", error);

      let errorMessage = "Failed to extract text from the image.";

      if (error.message?.includes("network")) {
        errorMessage =
          "Network error. Please check your internet connection and try again.";
      } else if (error.message?.includes("timeout")) {
        errorMessage =
          "Extraction took too long. Please try with a smaller image file.";
      } else if (error.message?.includes("memory")) {
        errorMessage =
          "Image is too large or complex. Please try a smaller image (under 5MB).";
      } else {
        errorMessage =
          "Could not read text from this image. Please try:\n" +
          "• A clearer, high-resolution photo\n" +
          "• Better lighting without glare\n" +
          "• Ensure the resume fills most of the image\n" +
          "• Avoid blurry or skewed images";
      }

      setError(errorMessage);

      if (error.message?.includes("network")) {
        toast.error("Network error. Please check your connection.");
      } else if (error.message?.includes("timeout")) {
        toast.error("Extraction timeout. Try a smaller image.");
      } else if (error.message?.includes("memory")) {
        toast.error("Image too large. Try a smaller file.");
      } else {
        toast.error("Could not read text. Try a clearer image.");
      }
    } finally {
      setIsExtracting(false);
    }
  };

  const autoGenerateCV = async (text: string) => {
    if (!text || !user?.id) return;

    setIsProcessing(true);
    try {
      const token = localStorage.getItem("token");

      toast.info("AI is generating your optimized resume...");
      const aiResponse = await fetch("/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rawText: text,
        }),
      });

      if (!aiResponse.ok) {
        throw new Error("Failed to generate resume with AI");
      }

      const aiResult = await aiResponse.json();

      const cvData = {
        title: `Resume ${new Date().toLocaleDateString()}`,
        cvData: {
          ...aiResult.resume,
          atsScore: aiResult.atsScore,
          optimizationTips: aiResult.optimizationTips || [],
          missingKeywords: aiResult.missingKeywords || [],
          rawText: text,
          generatedAt: new Date().toISOString(),
        },
        isActive: true,
      };

      const response = await fetch("/api/cv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cvData),
      });

      if (!response.ok) {
        throw new Error("Failed to save CV");
      }

      const result = await response.json();

      toast.success("Resume generated! Redirecting to editor...");

      router.push(`/dashboard/builder/${result.id}`);
    } catch (error) {
      console.error("Processing error:", error);
      toast.error(
        "Failed to generate resume. You can try again or edit manually.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/dashboard"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Upload Your Resume</h1>
            <p className="text-gray-600">
              Upload a clear image of your resume and we&apos;ll extract the
              content using AI-powered OCR to create an optimized ATS-friendly
              version.
            </p>
          </div>

          {}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-red-800 mb-2">
                    Could Not Read Resume
                  </h4>
                  <div className="text-sm text-red-700 whitespace-pre-line">
                    {error}
                  </div>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600 ml-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {}
          <div className="mb-8">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : file
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />

              {file ? (
                <div className="space-y-4">
                  <div className="relative inline-block">
                    <FileImage className="h-16 w-16 text-green-600 mx-auto" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearFile();
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFile();
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Choose Different File
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center gap-4">
                    <ImageIcon className="h-12 w-12 text-blue-500" />
                    <FileText className="h-12 w-12 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      Drop your resume image here
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      or click to browse files
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      JPG
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      PNG
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      WEBP
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Maximum file size: 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {}
          {file && !extractedText && (
            <div className="mb-8 text-center">
              <Button
                onClick={extractTextFromImage}
                disabled={isExtracting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
                size="lg"
              >
                {isExtracting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Extracting Text... {extractionProgress}%
                  </>
                ) : (
                  <>
                    <ImageIcon className="h-5 w-5 mr-2" />
                    Extract Text with OCR
                  </>
                )}
              </Button>

              {}
              {isExtracting && (
                <div className="mt-4 max-w-md mx-auto">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
                      style={{ width: `${extractionProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Analyzing your resume... Please wait
                  </p>
                </div>
              )}
            </div>
          )}

          {}
          {extractedText && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-green-800">
                    Text Extracted Successfully!
                  </h3>
                </div>
                <p className="text-sm text-green-700">
                  We&apos;ve extracted text from your resume and are now
                  generating an optimized ATS-friendly version. You&apos;ll be
                  redirected to the editor shortly.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Extracted Text Preview
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                    {extractedText}
                  </pre>
                </div>
              </div>

              <div className="text-center space-y-3">
                {isProcessing ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <Loader2 className="h-8 w-8 text-blue-600 mx-auto animate-spin mb-3" />
                    <h4 className="font-semibold text-blue-800 mb-1">
                      AI is Generating Your Resume
                    </h4>
                    <p className="text-sm text-blue-600">
                      Please wait while we create an optimized version...
                    </p>
                  </div>
                ) : (
                  <>
                    <Button
                      onClick={() => autoGenerateCV(extractedText)}
                      disabled={isProcessing}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
                      size="lg"
                    >
                      <FileText className="h-5 w-5 mr-2" />
                      Regenerate Resume
                    </Button>
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFile}
                        className="text-gray-500"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Upload Different Image
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-blue-800 mb-3">
                  Tips for Best Results
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-800 mb-2">
                      ✅ Good Image:
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Clear, high-resolution photo</li>
                      <li>• Good lighting (natural light best)</li>
                      <li>• Resume fills most of the frame</li>
                      <li>• Text is sharp and readable</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-700 mb-2">
                      ❌ Avoid:
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Blurry or out of focus images</li>
                      <li>• Dark shadows or glare</li>
                      <li>• Crooked or skewed photos</li>
                      <li>• Low resolution screenshots</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Pro Tip:</strong> Take a photo in good lighting
                    with your phone, or use a scanner app like Adobe Scan or
                    CamScanner for best results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
