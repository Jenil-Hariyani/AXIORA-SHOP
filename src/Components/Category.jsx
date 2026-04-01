import { getData } from "../Context/DataContext";
import { useNavigate } from "react-router-dom";

function Category() {
  const { CategoryOnlyData } = getData();
  const categories = CategoryOnlyData;
  const navigate = useNavigate();

  return (
    <div className="bg-[#101829] -mt-12 md:-mt-14 lg:-mt-16 relative z-10">
      <div
        className="
          max-w-7xl mx-auto
          flex md:grid
          flex-nowrap md:flex-none
          md:grid-cols-3 lg:grid-cols-6
          overflow-x-auto md:overflow-visible
          gap-3 md:gap-5 lg:gap-6
          py-6 px-4
          scrollbar-hide
        "
      >
        {categories?.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(`/Category/${item}`)}
            className="
              whitespace-nowrap
              uppercase
              bg-gradient-to-r from-red-500 to-purple-500
              text-white
              px-4 py-2
              text-xs sm:text-sm md:text-base
              rounded-lg
              cursor-pointer
              flex-shrink-0
              w-max md:w-full
              hover:scale-105 hover:shadow-lg
              active:scale-95
              transition-all duration-200
            "
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Category;
