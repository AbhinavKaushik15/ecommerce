import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../context/data/MyContext";
import { toast } from "react-toastify";
import { auth, fireDb } from "../../Firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Context = useContext(MyContext);
  const { loading, setLoading } = Context;

  const signup = async () => {
    setLoading(true);
    if (name === "" || email === "" || password === "") {
      return toast.error("All fields are required!");
    }

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      var user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
      };
      const userRef = collection(fireDb, "users");
      await addDoc(userRef, user);
      toast.success("Signup Successful.");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      toast.error("Signup failed!");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Signup
          </h1>
          <div>
            <input
              type="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Name"
            />
          </div>
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
        </div>
        <div className=" flex justify-center mb-3">
          <button
            onClick={signup}
            className=" bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg"
          >
            Signup
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Have an account{" "}
            <Link className=" text-red-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
