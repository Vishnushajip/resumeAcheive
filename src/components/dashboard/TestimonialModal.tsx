"use client";

import { useState } from "react";
import { testimonialsService } from "@/services/testimonials.service";
import { Button } from "@/components/ui/Button";
import { Star, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export function TestimonialModal({ isOpen, onClose, userEmail }: TestimonialModalProps) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!feedback || !name || !designation) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await testimonialsService.submitTestimonial({
        name,
        designation,
        feedback,
        rating,
        email: userEmail
      });
      toast.success("Thank you for your feedback! It will be reviewed by our team.");
      onClose();
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8 text-primary fill-primary" />
          </div>
          <h2 className="text-3xl font-black font-outfit tracking-tighter mb-2">Share Your Success</h2>
          <p className="text-zinc-500 font-medium">How was your experience with ResumeAchieve?</p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="p-1 transition-transform hover:scale-125"
              >
                <Star 
                  className={`h-8 w-8 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-200'}`} 
                />
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-14 px-6 rounded-2xl border border-zinc-100 bg-zinc-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold text-zinc-900 outline-none"
            />
            <input
              type="text"
              placeholder="Your Professional Job Title"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full h-14 px-6 rounded-2xl border border-zinc-100 bg-zinc-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold text-zinc-900 outline-none"
            />
            <textarea
              placeholder="Tell us how we helped your job search..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full min-h-[120px] p-6 rounded-2xl border border-zinc-100 bg-zinc-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold text-zinc-900 outline-none resize-none"
            />
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-16 rounded-2xl font-black text-lg uppercase tracking-tighter"
          >
            {loading ? <Loader2 className="h-6 w-6 animate-spin mr-2" /> : "Submit Feedback"}
          </Button>
        </div>
      </div>
    </div>
  );
}
