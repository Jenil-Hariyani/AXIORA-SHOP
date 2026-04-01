import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import axios from "axios";
import { useState } from "react";
import Footer from "./Components/Footer";
import SingleProducts from "./Pages/SingleProducts";
import CategoryProduct from "./Pages/CategoryProduct";

function App() {
  // location state
  const [location, setLocation] = useState();
  const [OpenDropdown, setOpenDropdown] = useState(false);
  const [detectClicked, setDetectClicked] = useState(false); // detect control
  const [loadingLocation, setLoadingLocation] = useState(false); // optional: loader

  // Detect location function
  const getLocation = async () => {
    if (detectClicked) return; // already detected, do nothing
    setLoadingLocation(true);
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        try {
          const res = await axios.get(url);
          setLoadingLocation(false);
          const exactLocation = res.data.address;
          setLocation(exactLocation);
          setOpenDropdown(false);
          setDetectClicked(true); // mark detected
          setLoadingLocation(false);
        } catch (error) {
          console.log(error);

          setLoadingLocation(false);
        }
      },
      (err) => {
        console.log(err);
        alert("Unable to retrieve your location");
        setLoadingLocation(false);
      },
    );
  };

  console.log(location);

  // REMOVE automatic detect
  // useEffect(() => {
  //   getLocation();
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar
          location={location}
          getLocation={getLocation}
          OpenDropdown={OpenDropdown}
          setOpenDropdown={setOpenDropdown}
          loadingLocation={loadingLocation}
        />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:id" element={<SingleProducts />}></Route>
          <Route
            path="/category/:category"
            element={<CategoryProduct />}
          ></Route>

          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route
            path="/cart"
            element={
              <Cart
                location={location}
                getLocation={getLocation}
                loadingLocation={loadingLocation}
              />
            }
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
