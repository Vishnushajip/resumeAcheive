import { NextRequest, NextResponse } from "next/server";
import { Experience } from "@/types/resume";

export async function POST(request: NextRequest) {
  try {
    const { userData, jobDescription, rawText } = await request.json();

    const mockResume = {
      personalInfo: {
        name: userData?.personalInfo?.fullName || userData?.fullName,
        email: userData?.personalInfo?.email || userData?.email,
        phone: userData?.personalInfo?.phone || userData?.phone,
        location: userData?.personalInfo?.location || userData?.location,
      },
      summary:
        userData?.summary ||
        "Professional summary will be generated based on your experience.",
      experience: Array.isArray(userData?.experience)
        ? userData.experience.map((exp: any) => ({
            company: exp.company,
            position: exp.position,
            duration: `${exp.startDate} - ${exp.endDate || "Present"}`,
            description: exp.description,
          }))
        : [],
      education: Array.isArray(userData?.education)
        ? userData.education.map((edu: any) => ({
            institution: edu.school,
            degree: edu.degree,
            year: edu.year,
          }))
        : [],
      skills: Array.isArray(userData?.skills) ? userData.skills : [],
      projects: userData?.projects || [],
    };

    const mockAtsScore = Math.floor(Math.random() * 20) + 80; // 80-99
    const mockOptimizationTips = [
      "Add more quantifiable achievements to your experience section",
      "Include industry-specific keywords from the job description",
      "Consider adding a certifications section",
      "Use action verbs to start bullet points",
    ];
    const mockMissingKeywords = jobDescription
      ? extractMissingKeywords(jobDescription, userData?.skills)
      : [];

    const response = {
      resume: mockResume,
      atsScore: mockAtsScore.toString(),
      optimizationTips: mockOptimizationTips,
      missingKeywords: mockMissingKeywords,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate resume" },
      { status: 500 },
    );
  }
}

function parseExperience(experience: string) {
  return [
    {
      company: "Current Company",
      position: "Senior Position",
      duration: "2020 - Present",
      description: experience,
    },
  ];
}

function parseEducation(education: string) {
  return [
    {
      institution: "University Name",
      degree: "Bachelor's Degree",
      year: "2020",
      details: education,
    },
  ];
}

function parseSkills(skills: string) {
  return skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function parseProjects(projects: string) {
  return [
    {
      name: "Key Project",
      description: projects,
      technologies: ["React", "TypeScript", "Node.js"],
    },
  ];
}

function extractMissingKeywords(
  jobDescription: string,
  userSkills: any,
): string[] {
  const commonKeywords = [
    "leadership",
    "communication",
    "teamwork",
    "problem-solving",
    "agile",
    "react",
    "javascript",
    "typescript",
    "node.js",
    "python",
  ];
  const skillsString = Array.isArray(userSkills)
    ? userSkills.join(" ").toLowerCase()
    : String(userSkills).toLowerCase();
  return commonKeywords.filter(
    (keyword) =>
      jobDescription.toLowerCase().includes(keyword) &&
      !skillsString.includes(keyword),
  );
}
