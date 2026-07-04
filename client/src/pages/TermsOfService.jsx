import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsOfService = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen py-12 px-6 sm:px-20 xl:px-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600">
              Last updated: July 4, 2026
            </p>
          </div>

          {/* Terms Content */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-md border border-gray-100 space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using QuickBlog, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. User Accounts</h2>
              <p>
                To publish content, comment, or access certain dashboard features, you may be required to register for an account. You are responsible for maintaining the confidentiality of your credentials and are fully responsible for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. User Content</h2>
              <p className="mb-4">
                You retain ownership of any blogs, text, images, and comments you publish on QuickBlog. However, by posting content to the platform, you grant us a worldwide, non-exclusive, royalty-free license to use, host, display, and distribute your content.
              </p>
              <p>
                You represent and warrant that your content does not violate any copyright, intellectual property rights, or privacy rights of any third party, and that it conforms to our content guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Prohibited Activities</h2>
              <p className="mb-4">
                You agree not to engage in any of the following prohibited behaviors:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Harassing, abusing, or harming other users.</li>
                <li>Posting spam, malware, or phishing links.</li>
                <li>Attempting to bypass security features, reverse-engineer the code, or disrupt server performance.</li>
                <li>Impersonating another person or entity.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Disclaimer of Warranties</h2>
              <p>
                QuickBlog is provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, regarding the platform's reliability, accuracy, or availability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, QuickBlog shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms of Service at any time. We will alert users to material changes by updating the "Last updated" date of these Terms.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
