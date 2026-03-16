import { Shield, Lock, Eye, Database, UserCheck, Cookie } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Privacy Policy
              </h1>
              <p className="text-gray-500 mt-1">Last updated: March 13, 2026</p>
            </div>
          </div>

          <div className="space-y-10">
            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="h-6 w-6 text-purple-600" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We collect information you provide directly to us, such as
                  when you create an account, use our resume builder, or contact
                  us for support.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal information (name, email address)</li>
                  <li>Resume content and career information</li>
                  <li>Job descriptions and application data</li>
                  <li>Usage patterns and preferences</li>
                  <li>Device and browser information</li>
                </ul>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="h-6 w-6 text-purple-600" />
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and maintain our resume building service</li>
                  <li>Process and analyze your resume content using AI</li>
                  <li>Generate ATS optimization recommendations</li>
                  <li>Communicate with you about your account and services</li>
                  <li>Improve our services and develop new features</li>
                  <li>Ensure security and prevent fraud</li>
                </ul>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="h-6 w-6 text-purple-600" />
                Data Storage and Security
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Your data is stored securely using industry-standard
                  encryption and security measures:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All data is encrypted in transit and at rest</li>
                  <li>
                    We use localStorage for secure client-side storage of strict
                    access rules
                  </li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to your personal information</li>
                  <li>Secure authentication with encrypted JWT tokens</li>
                  <li>
                    CV documents processed entirely client-side via OCR — never
                    uploaded to our servers
                  </li>
                </ul>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-purple-600" />
                Your Rights and Choices
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information at any time</li>
                  <li>Correct inaccurate or outdated information</li>
                  <li>
                    Request deletion of your account and all associated data
                  </li>
                  <li>Export your resume data in a portable JSON format</li>
                  <li>Opt-out of marketing communications at any time</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Cookie className="h-6 w-6 text-purple-600" />
                Cookies and Tracking
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We use cookies and similar technologies to enhance your
                  experience:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Essential cookies for site functionality and authentication
                    state
                  </li>
                  <li>
                    Analytics cookies to understand usage patterns (anonymized)
                  </li>
                  <li>
                    Preference cookies to remember your personalization settings
                  </li>
                  <li>
                    You can control or disable cookies through your browser
                    settings
                  </li>
                </ul>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Third-Party Services
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We may share information with trusted third-party services
                  for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>localStorage for client-side data storage</li>
                  <li>AI providers for resume analysis and generation</li>
                  <li>Analytics services for website improvement</li>
                  <li>We never sell your personal data to third parties</li>
                </ul>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Data Retention
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We retain your personal data for as long as you maintain an
                  active account with us. If you delete your account, we will
                  delete your personal information within 30 days, except where
                  required by law.
                </p>
              </div>
            </section>

            {}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Us
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  If you have questions about this Privacy Policy or want to
                  exercise your rights, please contact us:
                </p>
                <div className="bg-purple-50 border border-purple-100 p-6 rounded-2xl">
                  <p className="font-semibold text-purple-900">
                    Email: privacy@resumeachieve.com
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
                This Privacy Policy is part of our commitment to transparency
                and user privacy. By using ResumeAchieve.com, you agree to the
                collection and use of information as described in this policy.
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
            <Link href="/terms">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-semibold">
                View Terms &amp; Conditions
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
