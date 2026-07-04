import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { FaPenNib, FaLayerGroup, FaUsers, FaChartLine } from "react-icons/fa";

const AboutUs = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <FaPenNib className="text-3xl text-primary" />,
      title: "Empowering Writers",
      description:
        "We provide an intuitive, feature-rich editor that lets writers focus on what they do best: creating impactful stories.",
    },
    {
      icon: <FaLayerGroup className="text-3xl text-primary" />,
      title: "Diverse Categories",
      description:
        "From Technology and Startups to Lifestyle and Finance, we host a wide array of topics for every reader's curiosity.",
    },
    {
      icon: <FaUsers className="text-3xl text-primary" />,
      title: "Interactive Community",
      description:
        "Engage with ideas through comments and share thoughts with authors and fellow readers in real-time.",
    },
    {
      icon: <FaChartLine className="text-3xl text-primary" />,
      title: "Seamless Management",
      description:
        "An organized admin dashboard allows creators to manage, publish, and track engagement effortlessly.",
    },
  ];

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen py-12 px-6 sm:px-20 xl:px-32">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              About <span className="text-primary bg-clip-text bg-gradient-to-r from-primary to-blue-600">QuickBlog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We believe in the power of words. QuickBlog is a modern publishing platform
              designed to connect passionate voices with curious minds worldwide.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To simplify online publishing and foster a vibrant, globally connected community
                where knowledge, experiences, and stories flow freely. We strip away technical
                barriers so anyone can share their expertise or express their creativity.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you are sharing startup advice, tech breakthroughs, lifestyle hacks, or financial tips,
                QuickBlog is built to make your voice heard.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[320px] md:h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60"
                alt="Writing laptop"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Values Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Why Choose QuickBlog?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((val, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="mb-4 bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{val.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{val.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-blue-700 text-white rounded-3xl p-10 md:p-16 text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Share Your Story?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who write, publish, and inspire on QuickBlog.
              Get started by exploring our dashboard today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl transition duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                Explore Blogs
              </button>
              <button
                onClick={() => navigate("/admin")}
                className="bg-primary border border-white/20 hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-xl transition duration-200 cursor-pointer"
              >
                Write a Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
