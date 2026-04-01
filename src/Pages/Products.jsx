import React, { useEffect, useState } from "react";
import { getData } from "../Context/DataContext";
import FilterSection from "../Components/FilterSection";
import Loading from "../assets/Loading4.webm";
import ProductCard from "../Components/ProductCard";
import Pagination from "../Components/Pagination";
import Lottie from "lottie-react";
import Notfound from "../assets/Notfound.json";

function Products() {
  const { data, fetchAllProduct } = getData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // show loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchAllProduct();
      setLoading(false);
    };
    loadData();
  }, []);

  // FILTER LOGIC
  const filteredData = data?.filter((item) => {
    const searchText = search.toLowerCase();
    return (
      (item.title?.toLowerCase().includes(searchText) ||
        item.category?.toLowerCase().includes(searchText) ||
        item.brand?.toLowerCase().includes(searchText)) &&
      (category === "All" ||
        item.category?.toLowerCase() === category.toLowerCase()) && // all Category show
      (brand === "All" || item.brand?.toLowerCase() === brand.toLowerCase()) && // all brand show
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
    );
  });

  // Pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const currentData = filteredData?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {loading ? (
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
      ) : (
        // after fetching data show this ui
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
          {/* Sidebar FilterSection */}
          <div className="w-full lg:w-1/4">
            <FilterSection
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              brand={brand}
              setBrand={setBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>

          {/* Products */}
          <div className="w-full lg:w-3/4">
            {currentData?.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {currentData.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                  />
                </div>
              </>
            ) : (
              // when product is empty so show this
              <div className="flex flex-col justify-center items-center w-full h-full min-h-[70vh]">
                <Lottie
                  animationData={Notfound}
                  loop={true}
                  className="w-[400px] h-[400px]"
                />
                <h1 className="text-xl font-semibold mt-4">
                  No products found.
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
