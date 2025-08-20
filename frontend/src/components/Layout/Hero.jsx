
import React from "react";
import heroImage from "../../assets/landing.avif";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <>
      <section className="relative">
        {/* hero image */}
        <img
          src={heroImage}
          alt="heroImage"
          className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
        />
        <div className="flex absolute inset-0 justify-center items-center bg-black bg-opacity-60">
          <div className="p-6 text-center text-white">
            <h1 className="mb-4 text-4xl font-bold tracking-tighter uppercase md:text-9xl">
              Vacation <br /> Ready
            </h1>
            <p className="mb-6 text-sm tracking-tighter md:text-lg">
              Explore our wide range of products.
            </p>
            {/* TODO:Link jump */}
            <Link
              to="#"
              className="px-6 py-2 text-lg bg-white rounded-sm text-gray-950">
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
