import React, { useEffect, useState } from "react";
import MyContext from "./MyContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDb } from "../../Firebase/Firebase";

const MyState = (props) => {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("All fields are required!");
    }
    const productRef = collection(fireDb, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      toast.success("Product add successfully.");
      getProducts();
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [allProducts, setAllProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDb, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setAllProducts(productArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const editHandle = (item) => {
    setProducts(item);
  };

  const editProduct = async (item) => {
    setLoading(true);
    try {
      await setDoc(doc(fireDb, "products", products.id), products);
      toast.success("Product updated successfully.");
      getProducts();
      setLoading(false);
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteProduct = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDb, "products", item.id));
      toast.success("Product delete successfully.");
      setLoading(false);
      getProducts();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        allProducts,
        editHandle,
        editProduct,
        deleteProduct,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
