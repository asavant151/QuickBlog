import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I create a new blog post?",
      answer:
        "Simply click on the 'New Post' button in your dashboard, fill in the title and content, then hit publish. You can save drafts if you're not ready to publish immediately.",
    },
    {
      question: "Can I schedule posts for later?",
      answer:
        "Yes! When creating or editing a post, look for the 'Schedule' option in the publish settings. You can set any future date and time for automatic publishing.",
    },
    {
      question: "How do I customize my blog's appearance?",
      answer:
        "Navigate to 'Settings' > 'Theme' where you can choose from our pre-designed templates or customize colors, fonts, and layouts to match your brand.",
    },
    {
      question: "Is there a limit to how many posts I can create?",
      answer:
        "No, there are no limits on the number of posts you can create. You can publish as much content as you like on any of our plans.",
    },
    {
      question: "How do I add images to my posts?",
      answer:
        "You can drag and drop images directly into the editor or use the image upload button. We support JPG, PNG, and GIF formats with automatic optimization.",
    },
    {
      question: "Can multiple authors contribute to my blog?",
      answer:
        "Absolutely! Go to 'Settings' > 'Team' to invite contributors. You can set different permission levels for each team member.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              QuickBlog FAQs
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about creating, managing, and
              growing your blog.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-10">
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search FAQs..."
                className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute right-3 top-4 h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
                >
                  <button
                    className="w-full px-6 py-5 text-left focus:outline-none flex justify-between items-center"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                    <svg
                      className={`w-6 h-6 text-primary transform transition-transform duration-200 ${
                        activeIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`px-6 pb-5 pt-0 transition-all duration-300 ${
                      activeIndex === index ? "block" : "hidden"
                    }`}
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                Sorry, no FAQs match your search query.
              </p>
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our support team is ready to help you with any questions you might
              have about QuickBlog.
            </p>
            <button onClick={() => navigate("/contact")} className="bg-primary hover:bg-primary/80 text-white font-medium py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg cursor-pointer">
              Contact Support
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Faqs;
