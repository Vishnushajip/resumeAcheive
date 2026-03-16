import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AnalyticsTracker } from "@/components/layout/AnalyticsTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "arial"],
});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Free AI Resume Builder | ATS-Optimized | ResumeAchieve",
  description:
    "Create professional, ATS-friendly resumes for free with ResumeAchieve.com. AI-powered resume building with premium templates. Free PDF & DOCX downloads.",
  keywords: [
    "resume builder",
    "free resume maker",
    "ATS resume checker",
    "AI resume generator",
    "resumeachieve",
    "resume achieve",
    "CV maker",
    "professional resume builder",
    "ATS friendly resume",
    "totally free resume builder",
    "free ATS resume",
    "best free resume maker",
    "no cost resume builder",
    "job resume creator",
    "ATS compatible CV",
    "career tools free",
    "curriculum vitae builder free",
    "resume optimizer online free",
    "AI powered CV free",
  ],
  authors: [{ name: "ResumeAchieve" }],
  creator: "ResumeAchieve.com",
  publisher: "ResumeAchieve.com",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://www.resumeachieve.com",
  },
  openGraph: {
    title: "Free AI Resume Builder | ATS-Optimized | ResumeAchieve",
    description:
      "Build ATS-optimized resumes that get you hired. AI-powered resume builder with 95% ATS success rate. 100% free.",
    type: "website",
    url: "https://www.resumeachieve.com",
    siteName: "ResumeAchieve.com",
    locale: "en_US",
    images: [
      {
        url: "https://resumeachieve.com/logo.png",
        width: 1200,
        height: 630,
        alt: "ResumeAchieve.com - AI Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Resume Builder | ResumeAchieve",
    description:
      "Create ATS-optimized resumes with AI. Get hired faster with ResumeAchieve!",
    images: ["https://resumeachieve.com/logo.png"],
    creator: "@resumeachieve",
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ResumeAchieve.com",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "50000",
      bestRating: "5",
    },
    description:
      "AI-powered resume builder that creates ATS-optimized resumes. Free resume maker with professional templates.",
    url: "https://www.resumeachieve.com",
    logo: "https://www.resumeachieve.com/logo.png",
    screenshot: "https://www.resumeachieve.com/resume_builder_hero.png",
    featureList: [
      "AI Resume Generation",
      "ATS Optimization",
      "Professional Templates",
      "PDF/DOCX Export",
      "Real-time ATS Score",
    ],
    author: {
      "@type": "Organization",
      name: "ResumeAchieve",
      url: "https://www.resumeachieve.com",
    },
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ResumeAchieve.com",
    url: "https://www.resumeachieve.com",
    logo: "https://www.resumeachieve.com/logo.png",
    sameAs: [
      "https://twitter.com/resumeachieve",
      "https://linkedin.com/company/resumeachieve",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "resumeachieve@gmail.com",
      contactType: "customer support",
    },
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <Toaster position="top-center" richColors />
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
