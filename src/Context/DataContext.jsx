// ------------------------ FETCH ALL PRODUCTS AND SHOW IN UI -----------------------//
// DataContext.jsx
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

// Create Context
export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // Fetch all products from API
  const fetchAllProduct = async () => {
    try {
      console.log("Fetching products data...");
      const res = await axios.get("https://dummyjson.com/products?limit=200");
      const ProductsData = res.data.products;

      console.log("All Products:", ProductsData);

      // Filter only electronics / relevant categories
      const electronicsProducts = ProductsData.filter((item) =>
        [
          "laptops",
          "smartphones",
          "mobile-accessories",
          "sports-accessories",
          "mens-watches",
          "mens-shoes",
        ].includes(item.category),
      );

      console.log("Electronics Products:", electronicsProducts);
      setData(electronicsProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Optional: fetch products automatically on mount
  useEffect(() => {
    fetchAllProduct();
  }, []);

  // Ordered categories
  const categoryOrder = [
    "laptops",
    "smartphones",
    "mobile-accessories",
    "sports-accessories",
    "mens-watches",
    "mens-shoes",
  ];

  // Get only categories present in data
  const CategoryOnlyData = categoryOrder.filter((cat) =>
    data.some((item) => item.category === cat),
  );

  // Function to get unique brand data
  const getUniqueData = (data, property) => {
    return [...new Set(data.map((item) => item[property]))];
  };

  const brandOnlyData = getUniqueData(data, "brand");

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchAllProduct,
        CategoryOnlyData,
        brandOnlyData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use context
export const getData = () => useContext(DataContext);
