import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { rawText } = await request.json();

    if (!rawText) {
      return NextResponse.json(
        { error: 'Raw text is required' },
        { status: 400 }
      );
    }

    const parsedData = parseResumeText(rawText);

    const mockResume = {
      personalInfo: parsedData.personalInfo,
      summary: parsedData.summary,
      experience: parsedData.experience,
      education: parsedData.education,
      skills: parsedData.skills,
      projects: [],
    };

    const mockAtsScore = Math.floor(Math.random() * 20) + 80; // 80-99
    const mockOptimizationTips = [
      "Add more quantifiable achievements to your experience section",
      "Include industry-specific keywords",
      "Consider adding a certifications section",
      "Use action verbs to start bullet points",
      "Format dates consistently throughout your resume",
    ];
    const mockMissingKeywords = ["leadership", "communication", "teamwork", "problem-solving"];

    return NextResponse.json({
      resume: mockResume,
      atsScore: mockAtsScore.toString(),
      optimizationTips: mockOptimizationTips,
      missingKeywords: mockMissingKeywords,
    });
  } catch (error) {
    console.error('OCR processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process extracted text' },
      { status: 500 }
    );
  }
}

function parseResumeText(text: string) {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

  const personalInfo = {
    name: lines[0] || 'Your Name',
    email: extractEmail(text) || 'email@example.com',
    phone: extractPhone(text) || '+1 (555) 123-4567',
    location: extractLocation(text) || 'City, State',
  };

  const summary = extractSummary(lines);

  const experience = extractExperience(lines);

  const education = extractEducation(lines);

  const skills = extractSkills(text);

  return {
    personalInfo,
    summary,
    experience,
    education,
    skills,
  };
}

function extractEmail(text: string): string {
  const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
  return emailMatch ? emailMatch[0] : '';
}

function extractPhone(text: string): string {
  const phoneMatch = text.match(/(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/);
  return phoneMatch ? phoneMatch[0] : '';
}

function extractLocation(text: string): string {

  const locationMatch = text.match(/([A-Za-z\s]+,\s*[A-Z]{2})/);
  return locationMatch ? locationMatch[1] : '';
}

function extractSummary(lines: string[]): string {

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.length > 50 && !line.match(/^(Experience|Education|Skills|Work|Employment)/i)) {
      return line;
    }
  }
  return "Professional summary extracted from your resume.";
}

function extractExperience(lines: string[]): any[] {
  const experience: any[] = [];
  let currentExp: any = null;
  
  for (const line of lines) {

    if (line.match(/^(Experience|Work|Employment|Professional)/i)) {
      continue;
    }

    const companyMatch = line.match(/^(.+?)\s+(at|@)\s+(.+)$/);
    if (companyMatch) {
      if (currentExp) {
        experience.push(currentExp);
      }
      currentExp = {
        position: companyMatch[1],
        company: companyMatch[3],
        duration: '',
        description: '',
      };
    } else if (currentExp && line.match(/\d{4}|\d{1,2}\/\d{4}/)) {
      currentExp.duration = line;
    } else if (currentExp && line.length > 20) {
      currentExp.description += line + ' ';
    }
  }
  
  if (currentExp) {
    experience.push(currentExp);
  }
  
  return experience.length > 0 ? experience : [{
    company: "Previous Company",
    position: "Your Position",
    duration: "2020 - Present",
    description: "Extracted from your resume experience section.",
  }];
}

function extractEducation(lines: string[]): any[] {
  const education: any[] = [];
  
  for (const line of lines) {
    if (line.match(/^(Education|Academic|University|College|Degree)/i)) {
      continue;
    }

    const eduMatch = line.match(/(.+?)\s+(Bachelor|Master|PhD|Associate|B\.S\.|M\.S\.|B\.A\.|M\.A\.)/i);
    if (eduMatch) {
      education.push({
        institution: eduMatch[1],
        degree: eduMatch[2],
        year: "2020",
        details: line,
      });
    }
  }
  
  return education.length > 0 ? education : [{
    institution: "University Name",
    degree: "Bachelor's Degree",
    year: "2020",
    details: "Extracted from your resume education section.",
  }];
}

function extractSkills(text: string): string[] {

  const skillKeywords = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++',
    'HTML', 'CSS', 'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker',
    'Git', 'Agile', 'Scrum', 'Leadership', 'Communication', 'Project Management',
    'Data Analysis', 'Machine Learning', 'DevOps', 'Testing', 'REST API'
  ];
  
  const foundSkills = skillKeywords.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  );
  
  return foundSkills.length > 0 ? foundSkills : ['Technical Skills', 'Soft Skills', 'Problem Solving'];
}
