import React, { useState, useEffect } from "react";
import "../App.css";
import Hero from "../components/Hero";
import About from "../components/About";
import Package from "../components/Package";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import axios from "axios";

const HomePage = () => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`/wishlist/${user.id}`)
      .then((res) =>
        res.data.length === 0
          ? axios.post("/wishlist/create", { user_id: user.id })
          : ""
      );
  }, []);
  return (
    <div id="home">
      <Hero />
      <About />
      <Package />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;
