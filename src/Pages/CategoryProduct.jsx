import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import { ChevronLeft } from "lucide-react";
import ProductListView from "../Components/ProductListView";

function CategoryProduct() {
  const { category } = useParams(); // Get category from URL
  const [searchData, setSearchData] = useState([]); // Store category products
  const navigate = useNavigate();

  // Fetch products for selected category
  const getFilterData = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${category}`,
      );
      setSearchData(res.data.products);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  // Fetch data when category changes
  useEffect(() => {
    getFilterData();
    window.scrollTo(0, 0); // Scroll to top on category change
  }, [category]);

  return (
    <div>
      {searchData.length > 0 ? (
        <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center"
          >
            <ChevronLeft />
            Back
          </button>

          {/* Product List */}
          <div className="flex flex-col gap-6">
            {searchData.map((product, index) => (
              <ProductListView key={index} product={product} />
            ))}
          </div>
        </div>
      ) : (
        // Loading Indicator
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop className="w-32 h-32">
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
}

export default CategoryProduct;
