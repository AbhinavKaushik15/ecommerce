import React from "react";
import MyState from "./context/data/MyState";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Order from "./pages/order/Order";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import AllProduct from "./pages/allProducts/AllProduct";
import Cart from "./pages/cart/Cart";
import NoPage from "./pages/noPage/NoPage";
import Home from "./pages/home/Home";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/order"
            element={
              <UserProtectedRoute>
                <Order />
              </UserProtectedRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/dashboard"
            element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            }
          />
          <Route path="/allproducts" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route
            path="/addproduct"
            element={
              <AdminProtectedRoute>
                <AddProduct />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/updateproduct"
            element={
              <AdminProtectedRoute>
                <UpdateProduct />
              </AdminProtectedRoute>
            }
          />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  );
};

export default App;

// User Protected Route

export const UserProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

// Admin Protected Route

export const AdminProtectedRoute = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  if (admin.user.email === "abhinavsharmaas20000@gmail.com") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
