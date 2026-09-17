import { useState } from "react";
// import heroImg from "./assets/hero.png";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import ArticlePage from "./pages/ArticlePage"
import About from "./pages/About";
import {  Routes, Route } from "react-router-dom";
// import Hero from "./components/Hero/Hero";
// import FeaturedArticles from "./components/FeaturedArticles/FeaturedArticles";
// import Footer from './components/Footer/Footer'
// import Home from './pages/Home'
// import Blog from './pages/Blog'
// import ArticlePage from './pages/ArticlePage'
// import About from './pages/About'
// import { Routes, Route } from 'react-router-dom'
// import LatestArticles from "./components/LatestArticles/LatestArticles";
// import Newsletter from "./components/Newsletter/Newsletter";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
