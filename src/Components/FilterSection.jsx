import { getData } from "../Context/DataContext";

function FilterSection({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
}) {
  const { CategoryOnlyData, brandOnlyData } = getData();

  // Category change handler
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "All") {
      setCategory("All");
    } else {
      setCategory(value);
    }
  };

  // Brand change handler
  const handleBrandChange = (e) => {
    const value = e.target.value;
    setBrand(value);
  };

  return (
    <div className="bg-gray-100 mt-4 md:mt-6 p-3 rounded-md h-max">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search...."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
      />

      {/* Mobile Layout */}
      <div className="mt-3 grid grid-cols-2 gap-2 md:block">
        {/* Category */}
        <div>
          <h1 className="font-semibold text-base">Category</h1>

          {/* Mobile View (Select Box) */}
          <select
            className="bg-white w-full p-2 border-2 border-gray-200 rounded-md uppercase mt-2 md:hidden"
            value={category || "All"}
            onChange={handleCategoryChange}
          >
            <option value="All">All</option>
            {CategoryOnlyData?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Desktop View (Checkboxes) */}
          <div className="hidden md:flex flex-col gap-1 mt-2">
            {/* All Checkbox */}
            <div className="flex gap-2">
              <input
                type="checkbox"
                value="All"
                checked={category === "All"}
                onChange={handleCategoryChange}
              />
              <button className="cursor-pointer uppercase">All</button>
            </div>

            {/* Category Checkboxes */}
            {CategoryOnlyData?.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="checkbox"
                  name={item}
                  checked={category === item}
                  value={item}
                  onChange={handleCategoryChange}
                />
                <button className="cursor-pointer uppercase">{item}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div>
          <h1 className="font-semibold text-base mb-1">Brand</h1>
          <select
            className="bg-white w-full p-2 border-2 border-gray-200 rounded-md uppercase"
            value={brand || "All"}
            onChange={handleBrandChange}
          >
            <option value="All">All</option>
            {brandOnlyData?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Range */}
      <h1 className="mt-3 font-semibold text-base mb-1">Price Range</h1>
      <div className="flex flex-col gap-1">
        <label>
          Price Range: $ {priceRange[0]} - ${priceRange[1]}
        </label>
        <input
          type="range"
          min="0"
          max="2000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
        />
      </div>

      {/* Reset Button */}
      <button
        className="bg-red-500 text-white rounded-md px-3 py-2 mt-3 cursor-pointer w-fit md:w-auto"
        onClick={() => {
          setSearch("");
          setCategory("All");
          setBrand("All");
          setPriceRange([0, 2000]);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
}

export default FilterSection;
