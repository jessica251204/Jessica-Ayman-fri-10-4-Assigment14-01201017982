import { Link } from "react-router-dom";
import posts from "../../../data/posts";

function getRelatedPosts(currentPost) {
  let related = [];

  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];

    if (
      post.slug !== currentPost.slug &&
      post.category === currentPost.category
    ) {
      related.push(post);
    }

    if (related.length === 3) {
      break;
    }
  }

  if (related.length < 3) {
    for (let j = 0; j < posts.length; j++) {
      let otherPost = posts[j];
      let alreadyAdded = false;

      for (let k = 0; k < related.length; k++) {
        if (related[k].slug === otherPost.slug) {
          alreadyAdded = true;
        }
      }

      if (otherPost.slug !== currentPost.slug && alreadyAdded === false) {
        related.push(otherPost);
      }

      if (related.length === 3) {
        break;
      }
    }
  }

  return related;
}

function YouMayLike(props) {
  let currentPost = props.post;
  let relatedPosts = getRelatedPosts(currentPost);

  let cardElements = [];
  for (let i = 0; i < relatedPosts.length; i++) {
    let post = relatedPosts[i];

    cardElements.push(
      <Link
        key={post.slug}
        to={"/blog/" + post.slug}
        className="group relative bg-[#111111] rounded-2xl overflow-hidden border border-[#262626] hover:border-orange-500/30 transition-all duration-500"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            src={post.image}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#111111] to-transparent"></div>
          <span className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
            {post.category}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-white group-hover:text-orange-500 transition-colors line-clamp-2 mb-3">
            {post.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-neutral-500">
            <span className="flex items-center gap-2">
              <img
                alt={post.author.name}
                className="w-6 h-6 rounded-full"
                src={post.author.avatar}
              />
              {post.author.name}
            </span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </Link>,
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mt-20 pt-12 border-t border-[#262626]">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/30">
              <i className="fa-solid fa-images text-orange-500 text-xl"></i>
            </span>
            <div>
              <h2 className="text-2xl font-bold text-white">مقالات قد تعجبك</h2>
              <p className="text-neutral-500 text-sm">
                استكشف المزيد من المحتوى المميز
              </p>
            </div>
          </div>
          <Link
            to="/blog"
            className="hidden sm:flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors group"
          >
            عرض الكل
            <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardElements}
        </div>
      </div>
    </div>
  );
}

export default YouMayLike;
