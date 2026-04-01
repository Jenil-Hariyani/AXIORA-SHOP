import React, { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/emptyCart.jpg";
import { Player } from "@lottiefiles/react-lottie-player";
import success from "../assets/success.json";

function Cart({ location, getLocation, loadingLocation }) {
  const { cartItem, UpdateQuantity, removeItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showSuccess, setSuccess] = useState(false);

  // Track if location already detected
  const [detectClicked, setDetectClicked] = useState(false);

  // Total price calculation
  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    state: "",
    postcode: "",
    phone: "",
    country: "",
  });

  // Autofill from user & location
  useEffect(() => {
    setFormData({
      name: user?.fullName || "",
      address: location?.county || "",
      state: location?.state || "",
      postcode: location?.postcode || "",
      phone: "",
      country: location?.country || "",
    });

    // If location exists, mark detectClicked true
    if (location) setDetectClicked(true);
  }, [user, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // order successfully after perform
  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      state: "",
      postcode: "",
      phone: "",
      country: "",
    });
    setDetectClicked(false); // allow location detection again
  };

  // validation if any field is empty so show error 3 sec
  const handleCheckout = () => {
    const { name, address, state, postcode, phone, country } = formData;

    if (!name || !address || !state || !postcode || !phone || !country) {
      setError("Please fill all required fields before proceeding!");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setError("");
    setSuccess(true);
  };

  return (
    <div className="mt-6 md:mt-10 max-w-6xl mx-auto mb-5 px-3 md:px-0">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-xl md:text-2xl">
            My Cart ({cartItem.length})
          </h1>

          {/* Cart Items */}
          <div className="mt-5 md:mt-10 space-y-4">
            {cartItem.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 p-3 md:p-5 rounded-md flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                {/* Left */}
                <div className="flex gap-3 md:gap-4 w-full">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <div className="flex flex-col justify-between w-full">
                    <h1 className="line-clamp-2 text-sm md:text-base">
                      {item.title}
                    </h1>
                    <p className="text-red-500 font-semibold text-base md:text-lg">
                      ${item.price}
                    </p>

                    {/* Quantity + Delete */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => UpdateQuantity(item.id, "decrease")}
                        className="bg-red-500 text-white px-2 rounded-md"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => UpdateQuantity(item.id, "increase")}
                        className="bg-red-500 text-white px-2 rounded-md"
                      >
                        +
                      </button>
                      <FaRegTrashAlt
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 ml-4 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 mt-6">
            {/* Delivery Info */}
            <div className="bg-gray-100 rounded-md p-4 md:p-7 space-y-3">
              <h1 className="text-gray-800 font-bold text-lg md:text-xl mb-2">
                Delivery Info
              </h1>

              {/* Common input section for all input  */}
              {["name", "address", "state", "postcode", "phone", "country"].map(
                (field) => (
                  <div key={field} className="flex flex-col space-y-1">
                    <label className="capitalize">
                      {field.replace(/_/g, " ")}
                    </label>
                    <input
                      type={field === "phone" ? "tel" : "text"}
                      name={field}
                      placeholder={`Enter your ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                      className="p-2 rounded-md"
                      required
                    />
                  </div>
                ),
              )}

              <div className="flex justify-center mt-3">
                <button
                  onClick={getLocation}
                  disabled={location || loadingLocation}
                  className={`bg-red-500 text-white px-3 py-2 rounded-md w-max flex items-center gap-2 ${
                    location || loadingLocation
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {loadingLocation ? (
                    <>
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                      Detecting...
                    </>
                  ) : (
                    "Detect Location"
                  )}
                </button>
              </div>
            </div>

            {/* Bill Details */}
            <div className="bg-white border-gray-100 shadow-xl rounded-md p-4 md:p-7 space-y-3">
              <h1 className="text-gray-800 font-bold text-lg md:text-xl">
                Bill Details
              </h1>

              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <LuNotebookText /> Items Total
                </span>
                <span>${totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <MdDeliveryDining /> Delivery Charge
                </span>
                <span className="text-red-500 font-medium">$0 (FREE)</span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <GiShoppingBag /> Handling Charge
                </span>
                <span className="text-red-500 font-medium">$5</span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between font-semibold text-lg">
                <span>Grand Total</span>
                <span>${totalPrice + 5}</span>
              </div>

              {/* Success Video */}
              {showSuccess && (
                <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
                  <Player
                    autoplay
                    loop={false}
                    src={success}
                    style={{ height: "300px", width: "300px" }}
                    onEvent={(event) => {
                      if (event === "complete") {
                        setSuccess(false);
                        resetForm();
                        localStorage.removeItem("deliveryInfo");
                      }
                    }}
                  />
                  <p className="mt-4 text-green-600 font-semibold text-lg text-center">
                    Order Placed Successfully 🎉
                  </p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <p className="text-red-500 mt-2 font-semibold text-center">
                  {error}
                </p>
              )}

              <button
                onClick={handleCheckout}
                className="bg-red-500 text-white px-3 py-2 rounded-md w-full mt-3"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        /// if no any product item in cart so show this ui
        <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
          <h1 className="text-red-500/80 font-bold text-3xl md:text-5xl">
            Oh no! Your cart is empty
          </h1>
          <img
            src={emptyCart}
            alt="Empty Cart"
            className="w-[250px] md:w-[400px]"
          />
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
