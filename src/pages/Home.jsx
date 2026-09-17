import Hero from "../components/Hero/Hero";
import FeaturedArticles from "../components/FeaturedArticles/FeaturedArticles";
// import CategoryGrid from "../components/CategoryGrid/CategoryGrid";
import LatestArticles from "../components/LatestArticles/LatestArticles";
import Newsletter from "../components/Newsletter/Newsletter";
import FilteringCards from "../components/FilteringCards/FilteringCards";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedArticles />
      {/* <CategoryGrid /> */}
      <FilteringCards />
      <LatestArticles />
      <Newsletter />
    </>
  );
}

export default Home;