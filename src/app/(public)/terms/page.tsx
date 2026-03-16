import {
  FileText,
  Shield,
  AlertCircle,
  Award,
  Users,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-purple-100 p-3 rounded-xl">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Terms &amp; Conditions
              </h1>
              <p className="text-gray-500 mt-1">Last updated: March 13, 2026</p>
            </div>
          </div>

          <div className="space-y-10">
            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-purple-600" />
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  By accessing and using ResumeAchieve.com (&quot;the
                  Service&quot;), you accept and agree to be bound by the terms
                  and provisions of this agreement. If you do not agree to abide
                  by these terms, please do not use this service.
                </p>
                <p>
                  These terms apply to all users of our AI-powered resume
                  builder platform, including visitors, registered users, and
                  subscribers.
                </p>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="h-6 w-6 text-purple-600" />
                Service Description
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  ResumeAchieve.com is an AI-powered resume building service
                  that provides:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI-driven resume creation and editing tools</li>
                  <li>ATS optimization scoring and analysis</li>
                  <li>AI-powered content generation and refinement</li>
                  <li>Live canvas-based resume editor (Fabric.js)</li>
                  <li>Client-side OCR for existing CV upload (Tesseract.js)</li>
                  <li>Export functionality (PDF, DOCX, JSON)</li>
                  <li>Career success packs (cover letters, interview tips)</li>
                  <li>
                    Secure client-side storage of resumes via localStorage
                  </li>
                </ul>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-600" />
                User Responsibilities
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>As a user of ResumeAchieve.com, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Provide accurate, truthful, and non-deceptive information
                  </li>
                  <li>
                    Use the service for legitimate resume building purposes only
                  </li>
                  <li>Not upload malicious, illegal, or harmful content</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not attempt to reverse engineer our AI algorithms</li>
                  <li>Maintain the security of your account and OTP codes</li>
                  <li>Not share your account with others</li>
                </ul>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-purple-600" />
                Prohibited Activities
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>You are strictly prohibited from:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Creating fraudulent, misleading, or fabricated resumes
                  </li>
                  <li>
                    Using the service for spam, harassment, or illegal purposes
                  </li>
                  <li>Distributing malware, viruses, or harmful code</li>
                  <li>
                    Violating applicable local, state, or international laws
                  </li>
                  <li>
                    Infringing on others&apos; privacy or intellectual property
                    rights
                  </li>
                  <li>Attempting to gain unauthorized access to our systems</li>
                  <li>
                    Scraping or bulk downloading content from the platform
                  </li>
                  <li>Reselling or sublicensing access to the service</li>
                </ul>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-purple-600" />
                Subscription and Payment Terms
              </h2>
              <div className="space-y-6 text-gray-600">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    Free Plan
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Basic resume creation and editing tools</li>
                    <li>Limited to 3 resumes</li>
                    <li>Standard ATS scoring</li>
                    <li>Community support</li>
                  </ul>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-purple-900 mb-3">
                    Premium Plan
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-purple-800">
                    <li>Unlimited resume creation</li>
                    <li>All premium templates with live canvas editor</li>
                    <li>Advanced AI optimization and success packs</li>
                    <li>Priority 24/7 support</li>
                    <li>Advanced ATS reports and keyword analysis</li>
                    <li>Export in PDF, DOCX, JSON formats</li>
                    <li>CV upload with client-side OCR</li>
                  </ul>
                </div>
                <p>
                  All subscriptions are billed monthly or annually and may be
                  cancelled at any time. Refunds are provided within 7 days of
                  purchase if you are unsatisfied with the service.
                </p>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Intellectual Property
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Your Content:</strong> You retain full ownership of
                  all resumes and content you create. You grant us a limited
                  license to use your content solely to provide and improve our
                  services.
                </p>
                <p>
                  <strong>Our Content:</strong> The Service, including its
                  design, templates, and AI algorithms, is protected by
                  intellectual property laws. You may not copy, redistribute, or
                  commercialize our proprietary content without written
                  permission.
                </p>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Disclaimer and Limitation of Liability
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  ResumeAchieve.com is provided &quot;as is&quot; without
                  warranties of any kind. While our AI strives to produce
                  high-quality, ATS-optimized resumes, we do not guarantee
                  specific job application outcomes. We are not liable for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Job application outcomes or recruiting decisions</li>
                  <li>System downtime or service interruptions</li>
                  <li>Data loss or corruption due to user error</li>
                  <li>
                    Client-side storage failures (localStorage limitations)
                  </li>
                  <li>Consequential, indirect, or incidental damages</li>
                </ul>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Termination
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We reserve the right to terminate or suspend access to our
                  service immediately, without prior notice or liability, for
                  any reason including breach of these Terms, violation of
                  applicable laws, or fraudulent activity. Upon termination,
                  your account and all associated data will be deleted in
                  accordance with our data retention policy.
                </p>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Changes to Terms
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We reserve the right to modify these terms at any time.
                  Changes will be effective immediately upon posting. Your
                  continued use of the service after changes constitutes
                  acceptance of the modified terms. We will notify registered
                  users of significant changes via email.
                </p>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Governing Law
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  These Terms shall be governed by and construed in accordance
                  with the laws of India, without regard to its conflict of law
                  provisions. Any disputes arising from these Terms shall be
                  subject to exclusive jurisdiction of the courts in Bengaluru,
                  Karnataka, India.
                </p>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  If you have questions about these Terms &amp; Conditions,
                  please contact us:
                </p>
                <div className="bg-purple-50 border border-purple-100 p-6 rounded-2xl">
                  <p className="font-semibold text-purple-900">
                    Email: legal@resumeachieve.com
                  </p>
                  <p className="font-semibold text-purple-900 mt-1">
                    WhatsApp: +91 79946 89802
                  </p>
                  <p className="text-purple-700 mt-1">
                    Response Time: Within 48 hours
                  </p>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500 text-center">
                By using ResumeAchieve.com, you acknowledge that you have read,
                understood, and agree to be bound by these Terms &amp;
                Conditions.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button
                variant="outline"
                className="border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold"
              >
                Back to Home
              </Button>
            </Link>
            <Link href="/privacy">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-semibold">
                View Privacy Policy
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
