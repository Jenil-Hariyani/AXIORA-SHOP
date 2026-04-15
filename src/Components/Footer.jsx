import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* INFO */}
          <div>
            <Link to="/">
              <h1 className="text-red-500 text-2xl font-bold">Axiora</h1>
            </Link>
            <p className="mt-4 text-sm">
              Powering Your World with the Best in Electronics.
            </p>
            <p className="mt-2 text-sm">
              Rakot,Gujrat
            </p>
            <p className="text-sm">Email: Axiora@gmail.com</p>
            <p className="text-sm">Phone:+91 99041 43421</p>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="text-sm space-y-2">
              <li className="hover:text-white cursor-pointer">Contact Us</li>
              <li className="hover:text-white cursor-pointer">
                Shipping & Returns
              </li>
              <li className="hover:text-white cursor-pointer">FAQs</li>
              <li className="hover:text-white cursor-pointer">
                Order Tracking
              </li>
              <li className="hover:text-white cursor-pointer">Size Guide</li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4 text-xl">
              <a
                href="https://www.linkedin.com/in/jenil-hariyani-3b7a03371/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="hover:text-blue-500 transition" />
              </a>
              <a
                href="https://www.instagram.com/jenil_hariyani_/?next=&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="hover:text-pink-500 transition" />
              </a>
              <a
                href="https://github.com/Jenil-Hariyani"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="hover:text-gray-400 transition" />
              </a>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay in the Loop</h3>
            <p className="text-sm mb-4">
              Subscribe to get special offers, free giveaways, and more
            </p>
            <form className="flex justify-center items-center gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="
                  w-[65%] sm:w-[70%] md:w-[80%] lg:w-[85%] xl:w-[88%]
                  p-2
                  rounded-l-md
                  text-gray-900 bg-white
                  focus:outline-none focus:ring-2 focus:ring-gray-500
                "
              />
              <button
                type="submit"
                className="
                  bg-red-600 text-white
                  px-3 py-2 md:px-3 md:py-1.5
                  rounded-r-md
                  hover:bg-red-700 transition
                "
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-red-500">Axiora</span>. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
