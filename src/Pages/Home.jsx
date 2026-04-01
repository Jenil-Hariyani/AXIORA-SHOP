import Carousel from "../Components/Carousel";
import Features from "../Components/Features";
import Footer from "../Components/Footer";
import MidBanner from "../Components/MidBanner";

function Home() {
  return (
    <div className="overflow-hidden">
      <Carousel />
      <MidBanner />
      <Features />
    </div>
  );
}

export default Home;
