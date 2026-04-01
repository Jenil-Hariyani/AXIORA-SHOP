import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrums from "../Components/Breadcrums";
import Loading from "../assets/Loading4.webm";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../Context/CartContext.jsx";

function SingleProducts() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  // Get Product by id
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <video
          muted
          autoPlay
          loop
          playsInline
          className="w-40 h-40 object-contain"
        >
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen w-full text-red-500 font-bold">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen w-full text-gray-700 font-bold">
        Product not found
      </div>
    );
  }

  // Calculate original price before discount
  const originalPrice = Math.round(
    product.price + (product.price * product.discountPercentage) / 100,
  );

  return (
    <div className="px-4 pb-4 md:px-0">
      <Breadcrums title={product.title} />

      <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* Product Image */}
        <div className="w-full">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/400"}
            alt={product.title}
            className="rounded-xl md:rounded-2xl w-full object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Title */}
          <h1 className="text-xl md:text-3xl font-bold text-gray-800">
            {product.title}
          </h1>

          {/* Category */}
          <div className="text-sm md:text-base text-gray-700">
            {product.brand?.toUpperCase() || "UNKNOWN"}/{" "}
            {product.category?.toUpperCase() || "UNKNOWN"} /{" "}
            {product.model || "-"}
          </div>

          {/* Price */}
          <p className="text-lg md:text-xl text-red-500 font-bold">
            ${product.price}
            <span className="line-through text-gray-700 ml-2">
              ${originalPrice}
            </span>
            <span className="bg-red-500 text-white px-2 md:px-4 py-1 rounded-full ml-2 text-xs md:text-sm">
              {product.discountPercentage}% discount
            </span>
          </p>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-600">
            {product.description || "No description available."}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-3 md:gap-4">
            <label className="text-sm font-medium text-gray-700">
              Quantity:
            </label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 md:w-20 border-gray-300 rounded-lg px-2 md:px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Add to Cart Button */}
          <div className="flex gap-4 mt-2 md:mt-4">
            <button
              onClick={() => addToCart({ ...product, quantity })}
              className="w-full md:w-fit flex items-center justify-center gap-2 px-4 md:px-6 py-2 text-sm md:text-lg bg-red-500 text-white rounded-md"
            >
              <IoCartOutline className="w-5 h-5 md:w-6 md:h-6" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProducts;
