import React from "react";
import banner from "../assets/banner1.jpg";
import { useNavigate } from "react-router-dom";

const MidBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 py-8 md:py-24">
      <div
        className="
          relative max-w-7xl mx-auto
          md:rounded-2xl
          flex items-center justify-center
          px-4 sm:px-6 md:px-0
          min-h-[90vh] md:h-[600px]
          bg-cover bg-center
        "
        style={{
          backgroundImage: `url(${banner})`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 md:rounded-2xl"></div>

        {/* Content */}
        <div className="relative text-center text-white px-4 sm:px-6 md:px-10 max-w-xs sm:max-w-md md:max-w-full">
          <h1
            className="
            text-xl sm:text-2xl md:text-3xl lg:text-5xl
            font-bold leading-tight
            mb-3 md:mb-4
          "
          >
            Next-Gen Electronics at Your Fingertips
          </h1>

          <p
            className="
            text-xs sm:text-sm md:text-xl
            leading-relaxed
            mb-4 md:mb-6
          "
          >
            Discover the latest tech innovations with unbeatable prices and free
            shipping on all orders.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="
              bg-red-500 hover:bg-red-600
              text-white font-semibold
              px-4 py-2 md:px-6 md:py-3
              text-xs sm:text-sm md:text-base
              rounded-lg
              transition duration-300
            "
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MidBanner;
