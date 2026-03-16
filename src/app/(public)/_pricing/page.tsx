import { Button } from "@/components/ui/Button";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for students and early-career pros.",
      features: [
        "1 ATS-Friendly Resume",
        "Community Templates",
        "PDF Export Only",
        "Basic AI Support"
      ],
      cta: "Try for Free",
      popular: false
    },
    {
      name: "Professional",
      price: "$19",
      period: "/month",
      description: "Everything you need for a serious job search.",
      features: [
        "Unlimited Resumes",
        "Premium Live Editor",
        "Advanced AI Analysis",
        "Keywords Optimization",
        "Multi-Format Export (PDF, DOCX)",
        "Cover Letter Generator"
      ],
      cta: "Go Pro Now",
      popular: true
    },
    {
      name: "Executive",
      price: "$49",
      period: "/month",
      description: "Tailored for senior leadership and networking.",
      features: [
        "Everything in Pro",
        "LinkedIn Optimization",
        "Priority AI Processing",
        "Custom Domains",
        "Personal Branding Pack",
        "Success Pack Access"
      ],
      cta: "Get Started",
      popular: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center space-y-4 mb-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your career stage. No hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <div 
            key={i} 
            className={`
              relative flex flex-col p-8 rounded-3xl border transition-all hover:shadow-xl
              ${plan.popular ? "bg-card border-primary ring-4 ring-primary/10 scale-105" : "bg-card"}
            `}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> MOST POPULAR
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="flex items-baseline gap-1 my-4">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <p className="text-muted-foreground text-sm">{plan.description}</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-sm">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/login">
              <Button 
                variant={plan.popular ? "primary" : "outline"} 
                className="w-full h-12 text-md font-bold"
              >
                {plan.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
