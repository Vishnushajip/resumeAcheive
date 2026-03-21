"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, X, Check, RefreshCw, Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { aiService } from "@/services/ai.service";
import { toast } from "sonner";

interface AISuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  section: string;
  onApply: (newText: string) => void;
}

const AI_OPTIONS = [
  {
    id: "improve",
    label: "✨ Improve Writing",
    prompt:
      "Improve this text to be more professional and impactful. Use strong language and ensure it reads naturally.",
  },
  {
    id: "professional",
    label: "💼 Make Professional",
    prompt:
      "Rewrite this in a more professional, formal tone suited for corporate environments.",
  },
  {
    id: "concise",
    label: "✂️ Make Concise",
    prompt:
      "Make this more concise while keeping all key points. Remove filler words and redundancy.",
  },
  {
    id: "detailed",
    label: "📝 Add Details",
    prompt:
      "Expand this with more specific details, quantifiable achievements, and context.",
  },
  {
    id: "action",
    label: "⚡ Action Verbs",
    prompt:
      "Rewrite using strong, impactful action verbs. Each point should begin with a powerful verb.",
  },
  {
    id: "ats",
    label: "🎯 ATS Optimize",
    prompt:
      "Optimize this for Applicant Tracking Systems (ATS). Use industry-standard keywords, quantify achievements, and ensure each bullet starts with a past-tense action verb.",
  },
  {
    id: "metrics",
    label: "📊 Add Metrics",
    prompt:
      "Enhance this by adding specific numbers, percentages, and quantifiable results wherever possible.",
  },
  {
    id: "keywords",
    label: "🔍 Add Keywords",
    prompt:
      "Rewrite this incorporating relevant industry keywords and technical skills that recruiters look for.",
  },
  {
    id: "shorter",
    label: "📏 Shorten",
    prompt:
      "Shorten this significantly — aim for 30–50% fewer words while preserving the core message.",
  },
  {
    id: "custom",
    label: "✏️ Custom Instruction",
    prompt: "",
  },
];

export function AISuggestionModal({
  isOpen,
  onClose,
  originalText,
  section,
  onApply,
}: AISuggestionModalProps) {
  const [selectedOption, setSelectedOption] = useState(AI_OPTIONS[0].id);
  const [customInstruction, setCustomInstruction] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Reset all state when modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedOption(AI_OPTIONS[0].id);
      setCustomInstruction("");
      setSuggestion("");
      setIsLoading(false);
      setHasGenerated(false);
    }
  }, [isOpen]);

  const getPrompt = () => {
    if (selectedOption === "custom") {
      return customInstruction.trim() || "Improve this text";
    }
    return AI_OPTIONS.find((o) => o.id === selectedOption)?.prompt ?? "";
  };

  const generateSuggestion = async () => {
    setIsLoading(true);
    setSuggestion("");
    try {
      const prompt = getPrompt();
      const result = await aiService.refineSection(
        section,
        `${prompt}: ${originalText}`,
      );
      const refinedText =
        typeof result === "string"
          ? result
          : result?.refinedContent
            ? result.refinedContent
            : result?.refined
              ? result.refined
              : JSON.stringify(result);
      setSuggestion(refinedText);
      setHasGenerated(true);
    } catch {
      toast.error("Failed to generate suggestion");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    setSuggestion("");
    setHasGenerated(false);
  };

  const handleApply = () => {
  const textToApply = suggestion; 
  onClose(); 
  onApply(textToApply); 
  toast.success("Suggestion Applied!");
};

  const isCustom = selectedOption === "custom";
  const canGenerate = !isCustom || customInstruction.trim().length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="h-5 w-5" />
            <h3 className="font-semibold">AI Text Refinement</h3>
            {section && (
              <span className="text-white/70 text-sm font-normal">
                — {section}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Original Text */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Original Text
            </label>
            <div className="bg-gray-50 rounded-lg p-4 text-gray-600 text-sm max-h-32 overflow-y-auto border border-gray-100">
              {originalText || (
                <span className="text-gray-400 italic">No text provided</span>
              )}
            </div>
          </div>

          {/* AI Options — shown when not yet generated */}
          {!hasGenerated && (
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                What would you like AI to do?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {AI_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedOption(option.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                      selectedOption === option.id
                        ? "bg-purple-100 text-purple-700 border-2 border-purple-300"
                        : "bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Custom instruction input */}
              {isCustom && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                    <Pencil className="h-3.5 w-3.5" />
                    Your custom instruction
                  </label>
                  <textarea
                    value={customInstruction}
                    onChange={(e) => setCustomInstruction(e.target.value)}
                    placeholder="e.g. Rewrite this for a senior engineering role at a startup, emphasising leadership and scale..."
                    rows={3}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {customInstruction.length} characters
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Generated Suggestion */}
          {hasGenerated && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  AI Suggestion
                </label>
                <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                  {AI_OPTIONS.find((o) => o.id === selectedOption)?.label}
                </span>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-gray-800 text-sm max-h-56 overflow-y-auto whitespace-pre-wrap">
                {isLoading ? (
                  <div className="flex items-center gap-2 text-purple-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </div>
                ) : (
                  suggestion
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end gap-3">
          {!hasGenerated ? (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={generateSuggestion}
                disabled={isLoading || !canGenerate}
                className="bg-gradient-to-r from-purple-600 to-blue-600 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Suggestion
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              {/* FIX: Try Again now goes back to options screen, not re-generates blindly */}
              <Button
                variant="outline"
                onClick={handleTryAgain}
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button
                onClick={handleApply}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4 mr-2" />
                Apply Suggestion
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}