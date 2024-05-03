import React, { useState } from "react";
import { server } from "../api";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle, AiOutlineApple } from "react-icons/ai";
// import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Authenticate, setAuthenticate] = useState({ status: false, message: "" });
  const navigate = useNavigate();

  const timeOut = (delay) => {
    setTimeout(() => {
      setAuthenticate({ status: false, message: "" });
    }, delay);
  };

  const normalLogin = (error) => {
    let errorMessage = "Something went wrong";
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = "Incorrect Email or Password";
      } else if (error.response.status === 500) {
        errorMessage = "Server Error";
      }
    } else if (error.message === "Network Error") {
      errorMessage = "You have poor or slow internet";
    }
    setAuthenticate({ status: false, message: errorMessage });
  };

  const offProvider = (error) => {
    let errorMessage = "Something went wrong";
    if (error.response) {
      if (error.response.status === 500) {
        errorMessage = "Server Error";
      }
    } else if (error.message === "Network Error") {
      errorMessage = "You have poor or slow internet";
    }
    setAuthenticate({ status: false, message: errorMessage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${server}/login`, { email, password });
      const data = response.data;
      if (data) {
        setAuthenticate({ status: true, message: "Login Successful" });
        navigate("/location");
      }
    } catch (error) {
      console.error("Error:", error);
      normalLogin(error);
    } finally {
      setLoading(false);
      timeOut(5000);
    }
  };

  const googleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${server}/login`, { email, password });
      const data = response.data;
      if (data) {
        setAuthenticate({ status: true, message: "Login Successful" });
        navigate("/location");
      }
    } catch (error) {
      console.error("Error:", error);
      offProvider(error);
    } finally {
      setLoading(false);
      timeOut(5000);
    }
  };
  const appleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${server}/login`, { email, password });
      const data = response.data;
      if (data) {
        setAuthenticate({ status: true, message: "Login Successful" });
        navigate("/location");
      }
    } catch (error) {
      console.error("Error:", error);
      offProvider(error);
    } finally {
      setLoading(false);
      timeOut(5000);
    }
  };
  return (
    <div className="pt-3  flex flex-col justify-center items-center">
      {loading && (
        <div className="fixed inset-0 bg-purple-500 bg-opacity-40 flex justify-center items-center z-10">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-purple-900"></div>
        </div>
      )}
      {Authenticate.status && (
        <div className={`bg-green-500 bg-opacity-80 p-1 w-3/12 fixed top-10 z-10 rounded-sm`} id="handlingResponse">
          <p className="text-sm text-white text-center font-semibold underline hover:text-violet-700 cursor-pointer">{Authenticate.message}</p>
        </div>
      )}
      {!Authenticate.status && Authenticate.message && (
        <div className={`bg-red-500 bg-opacity-80 p-1 w-3/12 fixed top-10 z-10 rounded-sm`} id="handlingResponse">
          <p className="text-sm text-white text-center font-semibold underline hover:text-violet-700 cursor-pointer">
            {Authenticate.message}
          </p>
        </div>
      )}
      <div className="w-1/2 flex text-xl text-black justify-between font-semibold">Log in{" "}
        <div className="text-sm align-bottom inline">or{" "}
          <Link to="./Signup" className="text-purple-900 inline">Create an account</Link>
        </div>
      </div>
      <div className="flex flex-col w-1/2 pt-3">
        <Link to="./" className="p-1 bg-violet-900 hover:bg-violet-800 hover:shadow-slate-950/30 shadow-lg text-white text-center relative w-full max-h-10 flex justify-center rounded-lg gap-2 mb-4 cursor-pointer" onClick={googleLogin}>
          <AiOutlineGoogle className="text-2xl absolute left-2 p-1" />
          <div>Log in with Google</div>
        </Link>
        <Link to="./" className="p-1 bg-purple-900 hover:bg-purple-800 hover:shadow-slate-950/30 shadow-lg text-white text-center relative w-full max-h-10 flex justify-center rounded-lg gap-2 mb-4 cursor-pointer" onClick={appleLogin}>
          <AiOutlineApple className="text-2xl absolute left-2 p-1" />
          <div>Log in with Apple</div>
        </Link>
      </div>
      <div className="flex text-black text-xl text-center justify-center items-center w-2/12">
        <span className="border border-black w-full min-w-full"></span>
        <span className="px-4">OR</span>
        <span className="border border-black w-full min-w-full"></span>
      </div>
      <form className="grid grid-flow-row gap-3 md:w-3/5 w-1/2 mx-auto rounded-lg p-3 px-8 overscroll-y-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col text-gray-800 py-1">
          <input className=" p-1 rounded-sm focus:border-blue-500 border border-violet-900 bg-white indent-3" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete=""/>
        </div>
        <div className="flex flex-col relative text-gray-800 py-1">
          <input className=" p-1 rounded-sm focus:border-blue-500 border border-violet-900 bg-white indent-3" type={visible ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="" />
          {visible ? (
            <AiOutlineEye className="absolute top-3 right-1 cursor-pointer" onClick={() => setVisible(false)} />) : (
            <AiOutlineEyeInvisible className="absolute top-3 right-1 cursor-pointer" onClick={() => setVisible(true)}/>
          )}
        </div>
        <div className="flex justify-between">
          <span className="text-sm">
            <input type="checkbox" id="remember" className="w-5" />
            <label>Remember Me</label>
          </span>
          <button className="p-1 px-5 bg-violet-900 shadow-lg hover:shadow-slate-950/30 text-white font-semibold rounded-sm" type="submit">
            Log In
          </button>
        </div>
      </form>
      <Link to="./forgot" className="text-violet-900 text-left hover:text-violet-700 hover:shadow-xl">Forgot Your Password&#63;</Link>
    </div>
  );
}