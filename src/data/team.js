import posts from "./posts";
const uniqueAuthors = new Map();
posts.forEach((post) => {
  if (!uniqueAuthors.has(post.author.name)) {
    uniqueAuthors.set(post.author.name, {
      id: uniqueAuthors.size + 1,
      name: post.author.name,
      role: post.author.role,
      image: post.author.avatar,
      social: {
        twitter: "#",
        github: "#",
        linkedin: "#",
      },
    });
  }
});

export const teamMembers = Array.from(uniqueAuthors.values());

export default teamMembers;