import { useParams } from "react-router-dom";
import posts from "../../data/posts";
import ArticleHero from "./Sections/ArticleHero";
import ArticleContent from "./Sections/ArticleContent";
import YouMayLike from "./Sections/YouMayLike";

function findPostBySlug(slug) {
  let foundPost = null;

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].slug === slug) {
      foundPost = posts[i];
      break;
    }
  }

  return foundPost;
}

function ArticleInfo() {
  let params = useParams();
  let slug = params.slug;

  let post = findPostBySlug(slug);

  if (post === null) {
    return <p>المقال غير موجود</p>;
  }

  return (
    <>
      <ArticleHero post={post} />
      <ArticleContent post={post} />
      <YouMayLike post={post} />
    </>
  );
}

export default ArticleInfo;