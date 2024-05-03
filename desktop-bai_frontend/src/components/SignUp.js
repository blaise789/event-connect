import React, { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle, AiOutlineApple } from "react-icons/ai";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Authenticate, setAuthenticate] = useState({
    status: false,
    message: "",
  });
  const navigate = useNavigate();

  const timeOut = (delay) => {
    setTimeout(() => {
      setAuthenticate({ status: false, message: "" });
    }, delay);
  };

  const normalSignup = (error) => {
    let errorMessage = "Something went wrong";
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = "Failed To Create Account";
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
      await axios.post("http://localhost:5000/v1/api/signup", {
        username,
        email,
        password,
        fullName,
        phoneNumber,
      });
      toast.success("Account created successfully!");
      navigate("/authentication");
    } catch (error) {
      normalSignup(error)
    } finally {
      setLoading(false);
      timeOut(4000)
    }
  };
  const googleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/v1/api/signup", {
        username,
        email,
        password,
        fullName,
        phoneNumber,
      });
      toast.success("Account created successfully!");
      navigate("/authentication");
    } catch (error) {
      offProvider(error)
    } finally {
      setLoading(false);
      timeOut(4000)
    }
  };
  const appleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/v1/api/signup", {
        username,
        email,
        password,
        fullName,
        phoneNumber,
      });
      toast.success("Account created successfully!");
      navigate("/authentication");
    } catch (error) {
      offProvider(error)
    } finally {
      setLoading(false);
      timeOut(4000)
    }
  };
  
  return (
    <div className="w-full flex flex-col absolute shadow-xl">
      {loading && (
        <div className="fixed inset-0 bg-purple-500 bg-opacity-40 flex justify-center items-center z-10">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-purple-900"></div>
        </div>
      )}
      {Authenticate.status && (
        <div className={`bg-green-500 bg-opacity-80 p-1 w-3/12 fixed top-10 z-10 rounded-sm right-36 mr-2`}>
          <p className="text-sm text-white text-center font-semibold underline hover:text-violet-700 cursor-pointer">
            {Authenticate.message}
          </p>
        </div>
      )}
      {!Authenticate.status && Authenticate.message && (
        <div className={`bg-red-500 bg-opacity-80 p-1 w-3/12 fixed top-10 z-10 rounded-sm right-36 mr-2`}>
          <p className="text-sm text-white text-center font-semibold underline hover:text-violet-700 cursor-pointer">
            {Authenticate.message}
          </p>
        </div>
      )}
      <div className="w-1/2 flex text-xl text-black justify-between self-center font-semibold relative pt-4">
        Sign up
        <div className="text-sm align-bottom inline">
          or{" "}
          <Link to="../" className="text-purple-900 inline">Have Acount&#63;</Link>
        </div>
      </div>
      <div className="flex flex-col w-1/2 pt-3 self-center relative">
        <a to="./" className="p-1 bg-violet-900 hover:bg-violet-800 hover:shadow-slate-950/30 shadow-lg text-white text-center relative w-full max-h-10 flex justify-center rounded-lg gap-2 mb-4 cursor-pointer" onClick={googleSignup}>
          <AiOutlineGoogle className="text-2xl absolute left-2 p-1" />
          <div>Sign up with Google</div>
        </a>
        <a to="./" className="p-1 bg-purple-900 hover:bg-purple-800 hover:shadow-slate-950/30 shadow-lg text-white text-center relative w-full max-h-10 flex justify-center rounded-lg gap-2 mb-4 cursor-pointer" onClick={appleSignup}>
          <AiOutlineApple className="text-2xl absolute left-2 p-1" />
          <div>Sign up with Apple</div>
        </a>
      </div>
      <div className="flex text-black text-xl text-center self-center justify-center items-center w-2/12 relative">
        <span className="border border-black w-full min-w-full"></span>
        <span className="px-4">OR</span>
        <span className="border border-black w-full min-w-full"></span>
      </div>
      <form className="grid grid-flow-row gap-3 md:w-3/5 w-1/2 self-center mx-auto pt-3 rounded-lg px-8 py-5 relative" onSubmit={handleSubmit}>
        <div className="flex flex-col text-gray-800 py-1">
          <input className="p-1 rounded-sm focus:border-blue-500 border border-violet-900 bg-white indent-3"
            type="text" placeholder="Your Full Names" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete=""/>
        </div>
        <div className="flex flex-col text-gray-800 py-1">
          <input className="p-1 rounded-sm focus:border-blue-500 border border-violet-900 bg-white indent-3"
            type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete=""/>
        </div>
        <div className="flex flex-col text-gray-800 py-1">
          <input
            className="p-1 rounded-sm focus:border-blue-500 border border-violet-900 bg-white indent-3"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete=""
          />
        </div>
        <div className="flex flex-col text-gray-400 py-1 mt-1">
          <input
            className="p-1 rounded-sm focus:border-blue-500 border border-violet-900 bg-white indent-3"
            type="tel"
            placeholder="Tel: +250 7899030993"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            autoComplete=""
          />
        </div>
        <div className="flex flex-col relative text-gray-400 py-1">
          <input
            className="p-1 rounded-sm focus:border-blue-500 border border-violet-900 bg-white indent-3"
            type={visible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete=""
          />
          {visible ? (
            <AiOutlineEye
              className="absolute top-3 right-1 cursor-pointer"
              onClick={() => setVisible(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute top-3 right-1 cursor-pointer"
              onClick={() => setVisible(true)}
            />
          )}
        </div>
        <div className="text-sm text-center">
          <input
            type="checkbox"
            id="terms"
            className="w-5"
            onClick={() => setTerms(!terms)}
          />
          <label>
            Agree To Our{" "}
            <Link
              className="text-purple-900 hover:text-purple-800 font-semibold"
              to="./"
            >
              Terms of Services
            </Link>{" "}
            and{" "}
            <Link
              className="text-purple-900 hover:text-purple-800 font-semibold"
              to="./"
            >
              Privacy Policy
            </Link>
          </label>
        </div>
        <button
          className={`w-full my-1 py-1 shadow-lg text-white shadow-slate-500/50 font-semibold rounded-lg mt-1 ${
            terms
              ? "bg-violet-900 hover:shadow-teal-500/40"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!terms}
        >
          Create account
        </button>
      </form>
    </div>
  );
}