"use client";

import React, { useState } from "react";
import { Sparkles, X, Check, RefreshCw, Loader2 } from "lucide-react";
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
    label: "Improve Writing",
    prompt: "Improve this text to be more professional and impactful",
  },
  {
    id: "professional",
    label: "Make Professional",
    prompt: "Rewrite this in a more professional tone",
  },
  {
    id: "concise",
    label: "Make Concise",
    prompt: "Make this more concise while keeping key points",
  },
  {
    id: "detailed",
    label: "Add Details",
    prompt: "Expand this with more specific details and achievements",
  },
  {
    id: "action",
    label: "Action Verbs",
    prompt: "Rewrite using strong action verbs",
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
  const [suggestion, setSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const generateSuggestion = async () => {
    setIsLoading(true);
    try {
      const option = AI_OPTIONS.find((o) => o.id === selectedOption);
      const result = await aiService.refineSection(
        section,
        `${option?.prompt}: ${originalText}`,
      );
      // Handle different response formats
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
    } catch (error) {
      toast.error("Failed to generate suggestion");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    onApply(suggestion);
    onClose();
    toast.success("AI suggestion applied!");
  };

  const handleTryAgain = () => {
    setHasGenerated(false);
    setSuggestion("");
    generateSuggestion();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="h-5 w-5" />
            <h3 className="font-semibold">AI Text Refinement</h3>
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
            <div className="bg-gray-50 rounded-lg p-4 text-gray-600 text-sm max-h-32 overflow-y-auto">
              {originalText}
            </div>
          </div>

          {/* AI Options */}
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedOption === option.id
                        ? "bg-purple-100 text-purple-700 border-2 border-purple-300"
                        : "bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Generated Suggestion */}
          {hasGenerated && (
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                AI Suggestion
              </label>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-gray-800 text-sm max-h-48 overflow-y-auto">
                {suggestion}
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
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
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
