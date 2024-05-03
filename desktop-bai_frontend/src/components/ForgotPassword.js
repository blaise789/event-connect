import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../api";


export default function ForgotPassword() {
  const [getCode, setGetCode] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Authenticate, setAuthenticate] = useState({
    status: false,
    message: "",
  });

  const timeOut = (delay) => {
    setTimeout(() => {
      setAuthenticate({ status: false, message: "" });
    }, delay);
  };

  const normalForgot = (error) => {
    let errorMessage = "Something went wrong";
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = "Invalid Code";
      } else if (error.response.status === 500) {
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
      await axios.post("http://localhost:5000/v1/api/forgot", {
        getCode
      });
      toast.success("Account created successfully!");
    } catch (error) {
      normalForgot(error)
    } finally {
      setLoading(false);
      timeOut(3000)
    }
  };

  const handleGetCodeClick = async () => {
    setLoading(true)
    setEmailSubmitted(true);
    setGetCode(true);
    try {
      const response = await axios.post(`${server}/forgot`, { getCode });
      const data = response.data;
      if (data) {
        toast.success("Login successfully");
      }
      toast.success("Good")
    } catch (error) {
      toast.error("Error Backend")
    } finally {
      setLoading(false)
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {loading && (
        <div className="fixed inset-0 bg-purple-500 bg-opacity-40 flex justify-center items-center z-10">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-purple-900"></div>
        </div>
      )}
      {Authenticate.status && (
        <div
          className={`bg-green-500 bg-opacity-80 p-1 w-3/12 fixed top-10 z-10 rounded-sm right-36 mr-2`}
        >
          <p className="text-sm text-white text-center font-semibold underline hover:text-violet-700 cursor-pointer">
            {Authenticate.message}
          </p>
        </div>
      )}
      {!Authenticate.status && Authenticate.message && (
        <div
          className={`bg-red-500 bg-opacity-80 p-1 w-3/12 fixed top-10 z-10 rounded-sm right-36 mr-2`}
        >
          <p className="text-sm text-white text-center font-semibold underline hover:text-violet-700 cursor-pointer">
            {Authenticate.message}
          </p>
        </div>
      )}
      <div className="flex flex-col justify-center self-center p-3">
        <h1 className="text-purple-900 text-xl font-semibold">
          Forgot password
        </h1>
        <p className="text-purple-900 ml-5 mt-2">
          Enter your registered email id for
          <br />
          verification. We will share the verification <br /> code on your
          email.
        </p>
        <div className="flex flex-col w-full px-5 my-6">
          <input
            className="p-1 rounded-sm border border-purple-800 indent-2 text-gray-800 border-current"
            type="email"
            placeholder="Enter your email here"
          />
        </div>
        {getCode && (
          <form className={`flex flex-col w-full px-5`} onSubmit={handleSubmit}>
            <input
              className="p-1 rounded-sm border border-purple-800 indent-2 text-gray-800 border-current"
              type="password"
              autoComplete=""
              placeholder="Enter your verification code here"
            />
            <button
              className="shadow-lg shadow-slate-500/50 hover:shadow-slate-500/40 text-white font-semibold rounded-lg p-2 my-6 bg-purple-800 hover:bg-purple-600 text-center"
              onSubmit={handleSubmit}
            >
              Continue
            </button>
          </form>
        )}
        {!getCode && (
          <button
            onClick={handleGetCodeClick}
            className={`w-11/12 shadow-lg shadow-slate-500/50 hover:shadow-slate-500/40 text-white font-semibold rounded-lg p-2 mt-4 bg-purple-800 hover:bg-purple-600 text-center self-center`}
          >
            Get Code
          </button>
        )}
      </div>
    </div>
  );
}
