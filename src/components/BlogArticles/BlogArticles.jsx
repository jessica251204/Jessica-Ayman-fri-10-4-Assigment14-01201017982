import React, { useState } from "react";
import defaultPosts from "../../data/posts";

const POSTS_PER_PAGE = 6;

function formatArabicDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

 function BlogArticles({ posts = defaultPosts }) {
  const [viewMode, setViewMode] = useState("grid");

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  function goToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-36.5">
      <div className="mb-8 flex items-center justify-between">
        <p className="text-neutral-400">
          عرض <span className="font-bold text-white">{posts.length}</span> مقالات
        </p>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#161616] border border-[#262626] rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              title="عرض شبكي"
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-orange-500 text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>

            <button
              onClick={() => setViewMode("list")}
              title="عرض قائمة"
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-orange-500 text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={
          viewMode === "grid"
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            : "flex flex-col gap-6"
        }
      >
        {currentPosts.map((post, index) => (
          <article
            key={post.id}
            className="group card overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <a className="block" href={`/blog/${post.slug}`}>
              <div className="relative h-52 overflow-hidden">
                <img
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  src={post.image}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-[#333333]">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {post.readTime}
                  </span>
                  <span className="w-1 h-1 bg-neutral-600 rounded-full"></span>
                  <span>{formatArabicDate(post.date)}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 leading-tight">
                  {post.title}
                </h3>

                <p className="text-neutral-400 mb-5 line-clamp-2 text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
                  <div className="flex items-center gap-3">
                    <img
                      alt={post.author.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-[#262626]"
                      src={post.author.avatar}
                    />
                    <div>
                      <p className="text-sm font-medium text-white">{post.author.name}</p>
                      <p className="text-xs text-neutral-500">{post.author.role}</p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300 border border-orange-500/20 group-hover:border-transparent">
                    <svg
                      className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-300 rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-3 rounded-xl border transition-all duration-300 ${
              currentPage === 1
                ? "bg-[#0a0a0a] border-[#262626] text-neutral-600 cursor-not-allowed"
                : "bg-[#161616] border-[#262626] text-white hover:border-orange-500/50 hover:bg-[#1a1a1a]"
            }`}
          >
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-1">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => goToPage(number)}
                className={`min-w-11 h-11 rounded-xl text-sm font-medium transition-all duration-300 ${
                  currentPage === number
                    ? "bg-linear-to-r from-orange-500 to-orange-600 text-white"
                    : "bg-[#161616] text-neutral-400 border border-[#262626] hover:border-orange-500/50 hover:text-white"
                }`}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-3 rounded-xl border transition-all duration-300 ${
              currentPage === totalPages
                ? "bg-[#0a0a0a] border-[#262626] text-neutral-600 cursor-not-allowed"
                : "bg-[#161616] border-[#262626] text-white hover:border-orange-500/50 hover:bg-[#1a1a1a]"
            }`}
          >
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <p className="text-center text-neutral-500 mt-4 text-sm">
          صفحة {currentPage} من {totalPages}
        </p>
      )}
    </div>
  );
}

export default BlogArticles;