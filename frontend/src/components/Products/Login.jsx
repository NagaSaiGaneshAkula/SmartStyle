

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "@/assets/login.webp";
import { loginUser } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { mergeCart } from "../../redux/slices/cartSlice";


const Login = () => {
  
  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  const location = useLocation();
  const { user, guestId, loading, error } = useSelector((state) => state.auth);

  const { cart } = useSelector((state) => state.cart);
  
  
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  
  const isCheckoutRedirect = redirect.includes("checkout");

  
  useEffect(() => {
    if (user) {
      
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, redirect, isCheckoutRedirect, navigate, dispatch]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    console.log(email, password);
    
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="flex">
        <div className="flex flex-col justify-center items-center p-8 w-full md:w-1/2 md:p-12">
          <form
            className="p-8 w-full max-w-md bg-white rounded-lg border shadow-sm"
            onSubmit={handleSubmit}>
            <div className="flex justify-center mb-6">
              <h2 className="text-xl font-medium">SmartStyle</h2>
            </div>
            <h2 className="mb-6 text-2xl font-bold text-center">
              Hey there! 👋
            </h2>
            <p className="mb-6 text-center">
              Enter your email and password to login.
            </p>

            {/* email */}
            <div className="mb-4">

              <label htmlFor="" className="block mb-2 text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 w-full rounded border"
                placeholder="Enter your email..."
              />
            </div>
            {/* password */}
            <div className="mb-4">
              <label htmlFor="" className="block mb-2 text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 w-full rounded border"
                placeholder="Enter your password..."
              />
            </div>

            {/*   SignIn button */}
            <button
              className="p-2 w-full font-semibold text-white bg-black rounded-lg transition hover:bg-gray-700"
              type="submit">
              {loading ? "loading..." : "SignIn"}
            </button>
            <p className="mt-6 text-sm text-center">
              Don't have an account?{"     "}
              <Link
                to={`/register?redirect=${encodeURIComponent(redirect)}`}
                className="text-blue-500">
                Register
              </Link>
            </p>
            {/* TODO: */}
          </form>
        </div>

        {/* mobile version hidden */}
        <div className="hidden w-1/2 bg-gray-800 md:block">
          <div className="flex flex-col justify-center items-center h-full">
            <img
              src={LoginImage}
              alt="Login to account"
              className="h-[750px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
