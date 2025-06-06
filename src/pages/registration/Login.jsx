import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/data/MyContext";
import { toast } from "react-toastify";
import { auth } from "../../Firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../../components/loader/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Context = useContext(MyContext);
  const { loading, setLoading } = Context;

  const login = async () => {
    setLoading(true);
    if (email === "" || password === "") {
      return toast.error("All fields are required!");
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(result));
      toast.success("Login Successful.");
      setEmail("");
      setPassword("");
      navigate("/");
      setLoading(false);
    } catch (error) {
      toast.error("Login Failed!");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {loading && <Loader />}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Login
          </h1>
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
            onClick={login}
            className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Don't have an account
            <Link className=" text-yellow-500 font-bold ml-1" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
      <h1>Admin ID: abhinavsharmaas20000@gmail.com</h1>
      <h1>Password: 123456</h1>
    </div>
  );
}

export default Login;
