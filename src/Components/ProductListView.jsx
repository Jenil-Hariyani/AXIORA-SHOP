import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

function ProductListView({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="bg-gray-100 flex gap-6 items-start p-3 md:p-5 rounded-md hover:shadow-md transition">
      {/* Image */}
      <img
        src={product?.images?.[0]}
        alt={product?.title}
        className="h-24 w-24 md:h-32 md:w-32 object-contain rounded-md cursor-pointer"
        onClick={() => navigate(`/products/${product?.id}`)}
      />

      {/* Content */}
      <div className="flex flex-col flex-1 space-y-2 md:space-y-3">
        {/* Title */}
        <h1 className="font-semibold text-sm md:text-xl md:font-bold line-clamp-2 md:line-clamp-2 hover:text-red-400">
          {product.title}
        </h1>

        {/* Price */}
        <p className="font-semibold flex items-center text-sm md:text-lg">
          $
          <span className="text-xl md:text-3xl font-bold ml-1">
            {product.price}
          </span>
          <span className="text-xs md:text-base ml-2">
            ({product.discountPercentage}% off)
          </span>
        </p>

        {/* Delivery */}
        <p className="text-xs md:text-sm leading-relaxed">
          FREE delivery <span className="font-semibold">Fri, 18 Apr</span>
          <br />
          Or fastest delivery{" "}
          <span className="font-semibold">Tomorrow, 17 Apr</span>
        </p>

        {/* Button */}
        <button
          onClick={() => addToCart(product)}
          className="bg-red-500 text-white text-sm md:text-base px-3 py-1.5 md:py-2 rounded-md mt-2 w-fit md:w-fit hover:bg-red-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductListView;
