import { useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaSearch,
  FaFilter,
  FaArrowRight,
} from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const BestSellers = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - replace with your actual data
  const books = [
    {
      id: 1,
      title: "The Creative Mindset",
      author: "Emma Johnson",
      category: "creativity",
      rating: 5,
      price: 24.99,
      image: "https://images.unsplash.com/photo-1569166071503-7fd3d9a2aca5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGhlJTIwQ3JlYXRpdmUlMjBNaW5kc2V0JTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D",
      featured: true,
    },
    {
      id: 2,
      title: "Digital Nomad Handbook",
      author: "Alex Chen",
      category: "lifestyle",
      rating: 4,
      price: 19.99,
      image: "https://images.unsplash.com/photo-1748016276313-7f9b25de7376?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RGlnaXRhbCUyME5vbWFkJTIwSGFuZGJvb2slMjBib29rfGVufDB8fDB8fHww",
    },
    {
      id: 3,
      title: "React Mastery",
      author: "Sarah Williams",
      category: "technology",
      rating: 5,
      price: 29.99,
      image: "https://images.unsplash.com/photo-1664222845171-f9ffe4579c1f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fFJlYWN0JTIwTWFzdGVyeSUyMGJvb2t8ZW58MHx8MHx8fDA%3D",
      featured: true,
    },
    {
      id: 4,
      title: "Healthy Cooking",
      author: "Michael Brown",
      category: "food",
      rating: 4,
      price: 22.99,
      image: "https://images.unsplash.com/photo-1557349964-34f68e722d29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SGVhbHRoeSUyMENvb2tpbmclMjBib29rfGVufDB8fDB8fHww",
    },
    {
      id: 5,
      title: "Mindfulness Today",
      author: "Lisa Zhang",
      category: "wellness",
      rating: 3,
      price: 17.99,
      image: "https://images.unsplash.com/photo-1521123845560-14093637aa7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fE1pbmRmdWxuZXNzJTIwVG9kYXklMjBib29rfGVufDB8fDB8fHww",
    },
    {
      id: 6,
      title: "Startup Success",
      author: "David Wilson",
      category: "business",
      rating: 5,
      price: 27.99,
      image: "https://images.unsplash.com/photo-1598301257982-0cf014dabbcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3RhcnR1cCUyMFN1Y2Nlc3MlMjBib29rfGVufDB8fDB8fHww",
    },
  ];

  const filteredBooks = books.filter((book) => {
    const matchesCategory = activeTab === "all" || book.category === activeTab;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "creativity", name: "Creativity" },
    { id: "technology", name: "Technology" },
    { id: "business", name: "Business" },
    { id: "lifestyle", name: "Lifestyle" },
    { id: "wellness", name: "Wellness" },
    { id: "food", name: "Food" },
  ];

  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Best Sellers
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most popular books our readers love this month
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search books or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-gray-600 hidden sm:inline">Filter:</span>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Category Tabs (Mobile) */}
          <div className="mb-8 md:hidden overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    activeTab === category.id
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Books */}
          {filteredBooks.some((book) => book.featured) && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Featured Picks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBooks
                  .filter((book) => book.featured)
                  .map((book) => (
                    <div
                      key={book.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="md:flex">
                        <div className="md:flex-shrink-0 md:w-48 h-auto bg-gray-200 flex items-center justify-center">
                          <img
                            className="h-full w-full object-cover"
                            src={book.image}
                            alt={book.title}
                          />
                        </div>
                        <div className="p-8">
                          <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                            {book.category}
                          </div>
                          <h3 className="mt-2 text-xl font-semibold text-gray-900">
                            {book.title}
                          </h3>
                          <p className="mt-1 text-gray-500">{book.author}</p>
                          <div className="mt-2 flex items-center">
                            {[...Array(5)].map((_, i) =>
                              i < book.rating ? (
                                <FaStar key={i} className="text-yellow-400" />
                              ) : (
                                <FaRegStar
                                  key={i}
                                  className="text-yellow-400"
                                />
                              )
                            )}
                            <span className="ml-2 text-gray-600">
                              {book.rating}.0
                            </span>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-2xl font-bold text-gray-900 mr-2.5 md:mr-24">
                              ${book.price.toFixed(2)}
                            </span>
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center">
                              View Details <FaArrowRight className="ml-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* All Books */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {activeTab === "all"
                ? "All Best Sellers"
                : categories.find((c) => c.id === activeTab)?.name}
            </h2>

            {filteredBooks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No books found matching your criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <img
                        className="h-full w-full object-cover"
                        src={book.image}
                        alt={book.title}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                            {book.title}
                          </h3>
                          <p className="text-gray-500 text-sm">{book.author}</p>
                        </div>
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                          {book.category}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center">
                        {[...Array(5)].map((_, i) =>
                          i < book.rating ? (
                            <FaStar
                              key={i}
                              className="text-yellow-400 w-4 h-4"
                            />
                          ) : (
                            <FaRegStar
                              key={i}
                              className="text-yellow-400 w-4 h-4"
                            />
                          )
                        )}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                          ${book.price.toFixed(2)}
                        </span>
                        <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors duration-300">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">
                Get the latest bestsellers delivered to your inbox
              </h2>
              <p className="mb-6 opacity-90">
                Join our newsletter to receive monthly updates on the hottest
                books and exclusive deals.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-500"
                />
                <button className="px-6 py-2 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BestSellers;
