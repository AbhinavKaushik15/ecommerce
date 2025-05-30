import { useContext, useEffect } from "react";
import MyContext from "../../context/data/MyContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/reducers/CartReducer";
import { toast } from "react-toastify";

function ProductCard() {
  const context = useContext(MyContext);
  const { mode, allProducts, searchKey, filterType, filterPrice } = context;

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);

  const addCart = (allProducts) => {
    dispatch(addToCart(allProducts));
    window.location.href = "/";
    toast.success("add to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Collection
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4">
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
                <div key={index} className="p-4 md:w-1/4 drop-shadow-lg">
                  <div
                    onClick={() =>
                      (window.location.href = `/productinfo/${id}`)
                    }
                    className="relative h-[85vh] border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-300 border-opacity-60 rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <div className="flex justify-center cursor-pointer">
                      <img
                        className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out"
                        src={imageUrl}
                        alt="blog"
                      />
                    </div>
                    <div className="px-5 border-t-2">
                      <h2
                        className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        <img
                          className="w-14"
                          src="https://sdmntprwestus.oaiusercontent.com/files/00000000-facc-6230-8fb0-792ea9926858/raw?se=2025-05-30T15%3A42%3A14Z&sp=r&sv=2024-08-04&sr=b&scid=56eed284-2746-593a-90d5-c158b44933d1&skoid=b64a43d9-3512-45c2-98b4-dea55d094240&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T23%3A49%3A32Z&ske=2025-05-30T23%3A49%3A32Z&sks=b&skv=2024-08-04&sig=NNA21zOmjt%2B%2BtrTTkqrSwRorG1%2BYR1%2Bh6yp4CfeGVSM%3D"
                          alt=""
                        />
                      </h2>
                      <h1
                        className="title-font text-lg font-medium text-gray-900 mb-2 leading-5"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {title}
                      </h1>
                      <p className="leading-relaxed mb-3">
                        {item.description.slice(0, 30)}...
                      </p>
                      <p
                        className="leading-relaxed mb-3"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        ₹ {price}
                      </p>
                    </div>
                    <div className="absolute bottom-2 z-[1000000] left-1/2 -translate-x-1/2">
                      <button
                        onClick={addCart}
                        type="button"
                        className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2 px-20 whitespace-nowrap"
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
  );
}

export default ProductCard;
