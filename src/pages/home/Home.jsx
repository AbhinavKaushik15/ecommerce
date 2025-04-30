import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/ProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { useDispatch, useSelector } from "react-redux";
import MyContext from "../../context/data/MyContext";

const Home = () => {
  const Context = useContext(MyContext);
  const { showInstallButton, handleInstallClick } = Context;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <Layout>
      <HeroSection />
      <div>
        <h1>My PWA App</h1>
        {showInstallButton && (
          <button onClick={handleInstallClick}>Install App</button>
        )}
      </div>
      <Filter />
      <ProductCard />
      <Track />
      <Testimonial />
    </Layout>
  );
};

export default Home;
