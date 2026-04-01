import { useEffect } from "react";
import { getData } from "../Context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Category from "./Category";
import { useNavigate } from "react-router-dom";

function Carousel() {
  const { data, fetchAllProduct } = getData();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProduct();
  }, []);

  // only show selected category
  const categoryOrder = [
    "laptops",
    "smartphones",
    "mobile-accessories",
    "sports-accessories",
    "mens-watches",
    "mens-shoes",
  ];

  const categorySlides = categoryOrder
    .map((cat) => {
      if (cat === "mobile-accessories") {
        return data?.find((item) => item.category === cat && item.id === 101);
      }
      return data?.find((item) => item.category === cat);
    })
    .filter(Boolean);

  // Left Arrow
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;

    return (
      <div onClick={onClick} className={className} style={{ zIndex: 3 }}>
        <AiOutlineArrowLeft
          className="arrow arrow-btn"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            color: "white",
            position: "absolute",
            padding: "2px",
            left: "50px",
          }}
        />
      </div>
    );
  };

  // Right Arrow
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;

    return (
      <div
        onClick={onClick}
        className={className}
        style={{ ...style, zIndex: 3 }}
      >
        <AiOutlineArrowRight
          className="arrow arrow-btn"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            color: "white",
            position: "absolute",
            padding: "2px",
            right: "50px",
          }}
        />
      </div>
    );
  };

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <Slider {...settings}>
        {categorySlides.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]"
          >
            <div className="flex flex-col md:flex-row gap-10 justify-center h-[600px] items-center my-20 px-4">
              {/* TEXT */}
              <div className="space-y-6 md:w-[50%] lg:w-[45%] md:ml-10 lg:ml-20">
                <h3 className="text-red-500 font-semibold font-sans text-sm">
                  Power Your World with the Best in Electronics
                </h3>

                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold uppercase line-clamp-3 md:w-[500px] text-white">
                  {item.title}
                </h1>

                <p className="md:w-[500px] line-clamp-3 text-gray-400 pr-7">
                  {item.description}
                </p>

                <button
                  onClick={() => navigate("/products")}
                  className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2"
                >
                  Shop Now
                </button>
              </div>

              {/* IMAGE */}
              <div
                className="flex justify-center items-center w-full cursor-pointer"
                onClick={() => navigate(`/products/${item.id}`)}
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="object-contain rounded-full w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] mx-auto hover:scale-105 transition-all shadow-2xl shadow-red-400 bg-white"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <Category />
    </div>
  );
}

export default Carousel;
