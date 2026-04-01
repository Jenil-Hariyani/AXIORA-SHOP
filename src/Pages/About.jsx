import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          About <span className="text-red-500">A</span>xiora
        </h1>

        <p className="text-gray-700 text-base sm:text-lg">
          Welcome to <span className="font-semibold text-red-600">Axiora</span>,
          your one-stop destination for premium lifestyle essentials, from smart
          gadgets and mobile accessories to sports gear, stylish shoes, and
          watches. We are committed to delivering top-quality products with
          modern style and a seamless, reliable shopping experience.
        </p>

        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-600">
            Our Mission
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">
            At Axiora, our mission is to make quality lifestyle products
            accessible to everyone. We aim to bring the latest trends in sports
            accessories, smart gadgets, footwear, and essentials at great
            prices, delivered with reliability and care.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-600">
            Why Choose Axiora?
          </h2>
          <ul className="list-disc pl-5 sm:pl-6 text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <li>
              Premium quality products across sports accessories, smart gadgets,
              footwear, and more
            </li>
            <li>Fast, secure, and reliable delivery</li>
            <li>Reliable customer support, always ready to help</li>
            <li>Easy returns and hassle-free shopping experience</li>
          </ul>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-600">
            Our Vision
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">
            We envision a future where lifestyle and technology enhance everyday
            living. At Axiora, we’re committed to offering innovative, stylish,
            and affordable products that make life easier and more enjoyable.
          </p>
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <h3 className="text-lg sm:text-xl font-semibold text-red-600 mb-2">
            Join the Axiora Family
          </h3>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            Whether you’re a tech enthusiast, a professional, or just looking
            for something cool and functional — Axiora has something for
            everyone.
          </p>
          <Link to={"/products"}>
            <button className="bg-red-600 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-red-700 transition duration-300">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
