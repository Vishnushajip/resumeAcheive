"use client";

const steps = [
  {
    step: "01",
    title: "Sign In with Email",
    desc: "Use your email address — we'll send a secure OTP. No passwords needed.",
  },
  {
    step: "02",
    title: "Enter Your Details",
    desc: "Fill in your experience, skills, and paste the job description for tailored optimization.",
  },
  {
    step: "03",
    title: "Download & Apply for Free",
    desc: "AI crafts your ATS-optimized resume. Export as PDF or DOCX for free and start applying today.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            From sign in to a polished, ATS-ready resume in 3 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-[42px] left-[calc(33%-20px)] right-[calc(33%-20px)] h-0.5 bg-purple-200" />
          {steps.map(({ step, title, desc }, i) => (
            <div key={i} className="text-center relative">
              <div className="w-20 h-20 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-extrabold mx-auto mb-6 shadow-lg shadow-purple-300 relative z-10">
                {step}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-500 max-w-xs mx-auto">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
