"use client";

import { useEffect, useState } from "react";
import { testimonialsService, TestimonialData } from "@/services/testimonials.service";
import { Star, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTestimonials = async (p: number) => {
    setLoading(true);
    try {
      const data = await testimonialsService.getApprovedTestimonials(p, 3);
      setTestimonials(data.testimonials || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials(page);
  }, [page]);

  if (!loading && testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter font-outfit">
            What Our Users Say
          </h2>
          <p className="text-zinc-500 font-medium">Real success stories from our global community</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {testimonials.map((t, i) => (
                <div
                  key={t.id || i}
                  className="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 hover:shadow-2xl hover:bg-white transition-all group"
                >
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating || 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-zinc-700 mb-8 leading-relaxed font-medium italic">
                    &ldquo;{t.feedback}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary uppercase">
                      {t.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <div className="font-black text-gray-900 font-outfit">{t.name}</div>
                      <div className="text-sm text-primary font-bold">
                        {t.designation}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="rounded-xl"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-bold text-zinc-500">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className="rounded-xl"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
