import { useContext } from "react";
import { FaUserTie } from "react-icons/fa";
import Layout from "../../../components/layout/Layout";
import MyContext from "../../../context/data/MyContext";
import DashboardTab from "./DashboardTabs";

function Dashboard() {
  const Context = useContext(MyContext);
  const { mode, allProducts, order, user } = Context;
  return (
    <Layout>
      <section className="text-gray-600 body-font mt-5 mb-10">
        <div className="w-full container px-5 mx-auto gap-32 mb-10 flex items-center justify-center">
          {/* Products */}
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div
              className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl flex flex-col items-center justify-center"
              style={{
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div
                className="text-purple-500 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <FaUserTie size={50} />
              </div>
              <h2
                className="title-font font-medium text-3xl text-black fonts1"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                {allProducts.length}
              </h2>
              <p
                className=" text-purple-500  font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total Products
              </p>
            </div>
          </div>
          {/* Orders */}
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div
              className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl flex flex-col items-center justify-center"
              style={{
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div
                className="text-purple-500 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <FaUserTie size={50} />
              </div>
              <h2
                className="title-font font-medium text-3xl text-black fonts1"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                {order.length}
              </h2>
              <p
                className=" text-purple-500  font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total Orders
              </p>
            </div>
          </div>
          {/* Users */}
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div
              className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl flex flex-col items-center justify-center"
              style={{
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div
                className="text-purple-500 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <FaUserTie size={50} />
              </div>
              <h2
                className="title-font font-medium text-3xl text-black fonts1"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                {user.length}
              </h2>
              <p
                className=" text-purple-500  font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total Users
              </p>
            </div>
          </div>
        </div>
        <DashboardTab />
      </section>
    </Layout>
  );
}

export default Dashboard;
