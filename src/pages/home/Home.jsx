import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/ProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import MyContext from "../../context/data/MyContext";
import { Link } from "react-router-dom";

const Home = () => {
  const Context = useContext(MyContext);
  const { handleInstall } = Context;

  return (
    <Layout>
      <HeroSection />
      {/* <button
        onClick={handleInstall}
        className="ml-14 px-3 py-2 bg-pink-500 text-white rounded-md"
      >
        Download App
      </button> */}
      <Filter />
      <ProductCard />
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={"/allproducts"}>
          <button className=" bg-gray-300 px-5 py-2 rounded-xl">
            See more
          </button>
        </Link>
      </div>
      <Track />
      <Testimonial />
    </Layout>
  );
};

export default Home;
