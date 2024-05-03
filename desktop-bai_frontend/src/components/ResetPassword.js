import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [reset, setReset] = useState("");
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

  const normalReset = (error) => {
    let errorMessage = "Something went wrong";
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = "Problems while signing up. Try Again";
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
      await axios.post("http://localhost:5000", {
        password,
        reset,
      });
      toast.success("Account created successfully!");
    } catch (error) {
      normalReset(error);
    } finally {
      setLoading(false);
      timeOut(3000);
    }
  };

  return (
    <div className="w-full flex h-full flex-col justify-center items-center">
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
      <div className="w-full flex flex-col text-gray-400 justify-center items-center self-center">
        <p className="text-purple-900 text-xl font-semibold">Reset password</p>
        <form
          className=" flex flex-col justify-center self-center items-center w-2/4 my-5"
          onSubmit={handleSubmit}
        >
          <input
            className="p-1 w-full rounded-sm border border-purple-900 my-2"
            autoComplete=""
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="p-1 w-full rounded-sm border border-purple-900 my-2"
            autoComplete=""
            type="password"
            placeholder="Retype your password"
            value={reset}
            onChange={(e) => setReset(e.target.value)}
          />
          <button className="shadow-lg shadow-slate-500/50 hover:shadow-slate-500/40 text-white bg-purple-900 hover:bg-purple-700 font-semibold rounded-sm w-full p-2 my-3">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}
