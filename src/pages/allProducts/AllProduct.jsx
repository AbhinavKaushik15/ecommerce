import { useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import MyContext from "../../context/data/MyContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/reducers/CartReducer";
import Filter from "../../components/filter/Filter";

const AllProduct = () => {
  const context = useContext(MyContext);
  const { mode, allProducts, searchKey, filterType, filterPrice } = context;

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);

  const addCart = (allProducts) => {
    dispatch(addToCart(allProducts));
    toast.success("add to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Filter />
      <section className="text-gray-600 body-font">
        <div className="container px-3 py-8 md:py-16 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1
              className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Our Latest Collection
            </h1>
            <div className="h-1 w-20 bg-pink-600 rounded"></div>
          </div>

          <div className="w-full flex flex-wrap mx-auto">
            {allProducts
              .filter((obj) => obj.title.toLowerCase().includes(searchKey))
              .filter((obj) => obj.category.toLowerCase().includes(filterType))
              .filter((obj) => obj.price.includes(filterPrice))
              .slice(0, 8)
              .map((item, index) => {
                const {
                  title,
                  price,
                  imageUrl,
                  category,
                  description,
                  date,
                  id,
                } = item;
                return (
                  <div
                    key={index}
                    className="p-2 mx-auto sm:mx-0 w-[55vh] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 drop-shadow-lg"
                  >
                    <div
                      onClick={() =>
                        (window.location.href = `/productinfo/${id}`)
                      }
                      className="relative h-[80vh] border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-300 border-opacity-60 rounded-2xl overflow-hidden"
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <div className="flex justify-center cursor-pointer">
                        <img
                          className="rounded-2xl w-full h-72 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out object-cover object-top"
                          src={imageUrl}
                          alt="blog"
                        />
                      </div>
                      <div className="px-5 border-t-2">
                        <h2
                          className="tracking-widest text-xs title-font font-medium text-gray-400"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          <img
                            className="w-14"
                            src="image/E-bharat.png"
                            alt=""
                          />
                        </h2>
                        <h1
                          className="title-font text-lg font-medium text-gray-900 mb-2 leading-5"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {title.slice(0, 22)}...
                        </h1>
                        <p className="leading-relaxed mb-3">
                          {item.description.slice(0, 18)}...
                        </p>
                        <p
                          className="leading-relaxed mb-3"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          ₹ {price}
                        </p>
                      </div>
                      <div className="absolute bottom-3 z-[1000000] left-1/2 -translate-x-1/2">
                        <button
                          onClick={() => addCart(item)}
                          type="button"
                          className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-[45vw] sm:w-[35vh] md:w-[30vh] lg:w-[30vh] xl:w-[32vh] py-2 whitespace-nowrap"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AllProduct;
