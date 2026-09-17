import React, { useState } from "react";
import posts, { categories as categoryData } from "../../data/posts";

export default function SearchBlog({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [activeCategory, setActiveCategory] = useState("الكل");

  const allCategories = [{ name: "الكل" }, ...categoryData];

  function filterPosts(currentSearch, currentCategory) {
    const searchLower = currentSearch.toLowerCase();

    const result = posts.filter((post) => {
      const categoryMatches =
        currentCategory === "الكل" || post.category === currentCategory;

      let searchMatches = true;
      if (searchLower !== "") {
        const titleLower = post.title.toLowerCase();
        const excerptLower = post.excerpt.toLowerCase();
        searchMatches =
          titleLower.includes(searchLower) ||
          excerptLower.includes(searchLower);
      }

      return categoryMatches && searchMatches;
    });

    if (onFilterChange) {
      onFilterChange(result);
    }
  }

  function handleSearchInput(e) {
    const value = e.target.value;
    setSearchTerm(value);
    filterPosts(value, activeCategory);
  }

  function handleCategoryClick(categoryName) {
    setActiveCategory(categoryName);
    filterPosts(searchTerm, categoryName);
  }

  return (
    <div className="sticky top-20 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="ابحث في المقالات..."
              value={searchTerm}
              onChange={handleSearchInput}
              className="w-full px-5 py-3 pr-12 rounded-xl bg-[#161616] border border-[#262626] text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.name
                    ? "bg-linear-to-r from-orange-500 to-orange-600 text-white"
                    : "bg-[#161616] text-neutral-400 border border-[#262626] hover:border-orange-500/30"
                }`}
              >
                {cat.name === "الكل" ? "جميع المقالات" : cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
