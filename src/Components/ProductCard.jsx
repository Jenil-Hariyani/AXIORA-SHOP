import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext.jsx";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div
      className="border relative border-gray-100 rounded-2xl cursor-pointer 
        hover:shadow-2xl transition-all p-2 h-max flex gap-3 md:block"
    >
      {/* Product Image */}
      <img
        src={product.images[0]}
        alt={product.title}
        className="bg-gray-100 aspect-square w-28 h-28 md:w-full md:h-auto object-cover"
        onClick={() => navigate(`/products/${product.id}`)}
      />

      {/* Product Details */}
      <div className="flex flex-col justify-between flex-1">
        <h1 className="line-clamp-2 p-1 font-semibold">{product.title}</h1>
        <p className="my-1 text-lg text-gray-800 font-bold">${product.price}</p>

        <button
          className="bg-red-500 px-3 py-2 text-sm rounded-md text-white w-fit 
            cursor-pointer flex gap-1 items-center justify-center font-semibold"
          onClick={() => addToCart(product)}
        >
          <IoCartOutline className="w-5 h-6" /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
