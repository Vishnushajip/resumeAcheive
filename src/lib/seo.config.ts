/**
 * SEO Configuration for ResumeAchieve.com
 * Centralized SEO settings for easy management
 *
 * To update SEO settings:
 * 1. Edit this file
 * 2. Rebuild and redeploy
 *
 * Search Console Verification:
 * - Google: Add your verification code to googleVerification
 * - Bing: Add your verification code to bingVerification
 *
 * IndexNow:
 * - Get API key from Bing Webmaster Tools
 * - Add to BING_INDEXNOW_KEY environment variable
 */

export const siteConfig = {
  // Basic site info
  name: "ResumeAchieve.com",
  tagline: "Free AI Resume Builder & ATS Resume Maker 2025",
  url: "https://www.resumeachieve.com",
  locale: "en_US",
  language: "en",

  // Contact info
  email: "resumeachieve@gmail.com",
  twitter: "@resumeachieve",

  // Search Console Verification Codes
  // Replace with your actual verification codes
  googleVerification: "your-google-verification-code",
  bingVerification: "your-bing-verification-code",

    // IndexNow API Key (from Bing Webmaster Tools)
  // Set as environment variable: BING_INDEXNOW_KEY

  // Branding
  logo: "/logo.png",
  heroImage: "/resume_builder_hero.png",

  // Keywords for SEO
  keywords: [
    "resumeachieve",
    "resume achieve",
    "free resume builder",
    "AI resume maker",
    "ATS resume checker",
    "professional CV builder",
    "totally free resume",
    "ATS friendly resume",
    "resume optimizer",
    "CV maker online",
    "job resume creator",
    "AI powered resume",
    "best free resume builder 2025",
    "ATS compatible CV",
    "career tools free",
  ],

  // Social links
  social: {
    twitter: "https://twitter.com/resumeachieve",
    linkedin: "https://linkedin.com/company/resumeachieve",
    github: "https://github.com/resumeachieve",
  },
} as const;

// Default metadata template
export const defaultMetadata = {
  title: `${siteConfig.name} | 100% Totally Free ${siteConfig.tagline}`,
  description: `Create professional, ATS-friendly resumes for free with ${siteConfig.name}. A totally free platform featuring AI-powered resume building, optimization, and premium templates. Free PDF, DOCX downloads.`,
  keywords: siteConfig.keywords.join(", "),
};

// JSON-LD Structured Data Templates
export const structuredDataTemplates = {
  // WebApplication schema
  webApp: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
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
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    screenshot: `${siteConfig.url}${siteConfig.heroImage}`,
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
      url: siteConfig.url,
    },
  },

  // Organization schema
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    sameAs: [siteConfig.social.twitter, siteConfig.social.linkedin],
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.email,
      contactType: "customer support",
    },
  },

  // FAQ Page schema (for FAQ sections)
  faqPage: (faqs: Array<{ question: string; answer: string }>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }),

  // Article/Blog schema
  article: (data: {
    title: string;
    description: string;
    url: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    author?: string;
  }) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    image: data.image,
    url: data.url,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      "@type": "Organization",
      name: data.author || siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logo}`,
      },
    },
  }),
};

// Helper function to generate page-specific metadata
export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}) {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}${siteConfig.logo}`;

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    keywords: siteConfig.keywords.join(", "),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      type,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
      creator: siteConfig.twitter,
    },
  };
}
