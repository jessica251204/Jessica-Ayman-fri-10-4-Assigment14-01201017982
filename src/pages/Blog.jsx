import BlogHero from "../components/BlogHero/BlogHero";
import SearchBlog from './../components/SearchBlog/SearchBlog';
import BlogArticles from './../components/BlogArticles/BlogArticles';


function Blog() {


  return (
   <>
   <BlogHero />
   <SearchBlog onFilterChange={(filtered) => setVisiblePosts(filtered)} />
    {/* <BlogArticles posts={filteredPosts} /> */}
    <BlogArticles />
   </>
  );
}

export default Blog;