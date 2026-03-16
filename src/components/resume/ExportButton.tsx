"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ExportButtonProps {
  resumeData: any;
  format: 'pdf' | 'docx' | 'json' | 'png';
  className?: string;
}

export function ExportButton({ resumeData, format, className }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      switch (format) {
        case 'json':
          exportAsJSON();
          break;
        case 'png':
          await exportAsPNG();
          break;
        case 'pdf':
          await exportAsPDF();
          break;
        case 'docx':
          await exportAsDOCX();
          break;
        default:
          throw new Error('Unsupported format');
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error(`Failed to export as ${format.toUpperCase()}`);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsJSON = () => {
    const jsonData = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.personalInfo?.name || 'resume'}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Resume exported as JSON!");
  };

  const exportAsPNG = async () => {


    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 1000;
    
    if (ctx) {

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 32px Arial';
      ctx.fillText(resumeData.personalInfo?.name || 'Your Name', 50, 100);
      
      ctx.font = '14px Arial';
      ctx.fillText(
        `${resumeData.personalInfo?.email || ''} | ${resumeData.personalInfo?.phone || ''}`,
        50,
        140
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${resumeData.personalInfo?.name || 'resume'}.png`;
          link.click();
          URL.revokeObjectURL(url);
          toast.success("Resume exported as PNG!");
        }
      });
    }
  };

  const exportAsPDF = async () => {


    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(resumeData.personalInfo?.name || 'Your Name', 20, 30);
    
    doc.setFontSize(12);
    doc.text(`${resumeData.personalInfo?.email || ''} | ${resumeData.personalInfo?.phone || ''}`, 20, 45);
    
    if (resumeData.summary) {
      doc.text('Professional Summary:', 20, 65);
      doc.setFontSize(10);
      const splitSummary = doc.splitTextToSize(resumeData.summary, 170);
      doc.text(splitSummary, 20, 75);
    }

    doc.save(`${resumeData.personalInfo?.name || 'resume'}.pdf`);
    toast.success("Resume exported as PDF!");
  };

  const exportAsDOCX = async () => {


    const rtfContent = createRTFContent(resumeData);
    const blob = new Blob([rtfContent], { type: 'application/rtf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.personalInfo?.name || 'resume'}.rtf`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Resume exported as RTF (DOCX compatible)!");
  };

  const createRTFContent = (data: any): string => {
    const name = (data.personalInfo?.name || 'Your Name').replace(/[\{\}\\\\]/g, '\\\\$&');
    const email = (data.personalInfo?.email || '').replace(/[\{\}\\\\]/g, '\\\\$&');
    const phone = (data.personalInfo?.phone || '').replace(/[\{\}\\\\]/g, '\\\\$&');
    const summary = (data.summary || 'Professional summary here.').replace(/[\{\}\\\\]/g, '\\\\$&');
    const experience = (data.experience?.[0]?.description || 'Experience details here.').replace(/[\{\}\\\\]/g, '\\\\$&');
    const education = (data.education?.[0]?.details || 'Education details here.').replace(/[\{\}\\\\]/g, '\\\\$&');

    return `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}}
{\\colortbl;\\red0\\green0\\blue0;}
\\viewkind4\\uc1\\pard\\cf1\\lang1033\\f0\\fs32 ${name}\\par
\\fs20 ${email} | ${phone}\\par
\\fs24\\par
\\fs28 Professional Summary\\par
\\fs20 ${summary}\\par
\\fs24\\par
\\fs28 Experience\\par
\\fs20 ${experience}\\par
\\fs24\\par
\\fs28 Education\\par
\\fs20 ${education}\\par
}`;
  };

  const formatLabels = {
    pdf: 'PDF',
    docx: 'DOCX',
    json: 'JSON',
    png: 'PNG',
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      variant="outline"
      size="sm"
      className={className}
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          {formatLabels[format]}
        </>
      )}
    </Button>
  );
}
