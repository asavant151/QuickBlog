import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen py-12 px-6 sm:px-20 xl:px-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600">
              Last updated: July 4, 2026
            </p>
          </div>

          {/* Policy Content */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-md border border-gray-100 space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Introduction</h2>
              <p>
                Welcome to QuickBlog. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
              <p className="mb-4">
                We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information Provided by You:</strong> We collect names, email addresses, usernames, passwords, contact preferences, and other similar information.</li>
                <li><strong>Log and Usage Data:</strong> Our servers automatically collect service-related, diagnostic, usage, and performance information when you access or use our Website.</li>
                <li><strong>Device Data:</strong> We collect information about your computer, phone, tablet, or other devices you use to access the Website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <p className="mb-4">
                We use personal information collected via our Website for a variety of business purposes described below:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To facilitate account creation and logon process.</li>
                <li>To post testimonials or allow commenting.</li>
                <li>To send administrative information to you.</li>
                <li>To protect our Services and enforce terms, conditions, and policies.</li>
                <li>To respond to user inquiries and offer support.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Sharing Your Information</h2>
              <p>
                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We do not sell or rent your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Data Security</h2>
              <p>
                We aim to protect your personal information through a system of organizational and technical security measures. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal info is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Cookies and Tracking</h2>
              <p>
                We may use cookies and similar tracking technologies to access or store information. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this site may become inaccessible or not function properly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Contact Us</h2>
              <p>
                If you have questions or comments about this policy, you may email us at support@quickblog.com or use our Contact Us page.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
