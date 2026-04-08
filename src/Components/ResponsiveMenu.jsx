import {
  UserButton,
  useUser,
  SignInButton,
  useClerk,
} from "@clerk/clerk-react";
import React from "react";
import { FaUserCircle, FaHome, FaInfoCircle } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function ResponsiveMenu({ openNav, setOpenNav }) {
  const { user } = useUser();
  const { signOut } = useClerk();

  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    {
      name: "Products",
      path: "/products",
      icon: <MdProductionQuantityLimits />,
    },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
    { name: "Contact", path: "/contact", icon: <IoCall /> },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpenNav(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-10 transition-opacity duration-300 ${
          openNav ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] z-20 
        bg-white/80 backdrop-blur-xl shadow-2xl 
        px-6 pt-16 pb-8 rounded-r-2xl
        transform transition-all duration-300 ease-in-out
        ${openNav ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* User Section */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center border-b pb-5 gap-3">
          {/* Icon */}
          {user ? (
            <UserButton size={55} />
          ) : (
            <FaUserCircle size={55} className="text-gray-500" />
          )}

          {/* Text */}
          <div>
            <h1 className="font-semibold text-lg">
              Hello, {user?.firstName || "Guest"}
            </h1>
            <p className="text-sm text-gray-500">Premium Member</p>
          </div>

          {/* Button */}
          {!user ? (
            <SignInButton
              mode="modal"
              appearance={{
                variables: {
                  colorPrimary: "#dc2626",
                  colorPrimaryText: "#ffffff",
                },
                elements: {
                  formButtonPrimary: "bg-red-600 hover:bg-red-700 text-white",
                },
              }}
            >
              <button className="bg-red-500 px-3 py-1 rounded-md text-white hover:bg-red-600 whitespace-nowrap">
                Sign In
              </button>
            </SignInButton>
          ) : (
            <button
              onClick={() => {
                signOut();
                setOpenNav(false);
              }}
              className="bg-red-500 px-3 py-1 rounded-md text-white hover:bg-red-600 whitespace-nowrap"
            >
              Logout
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="mt-10">
          <ul className="flex flex-col gap-8 text-lg font-semibold">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setOpenNav(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-4 relative p-2 rounded-lg transition-all duration-300
                  ${
                    isActive
                      ? "text-red-500 bg-red-50"
                      : "text-gray-800 hover:text-red-500 hover:bg-red-50"
                  }`
                }
              >
                <span className="text-xl transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
                <span className="relative">
                  {item.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                  →
                </span>
              </NavLink>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default ResponsiveMenu;
