import DeliveryPartners from "../components/DeliveryPartners";
import FeaturedProducts from "../components/FeaturedProducts";
import Hero from "../components/Hero";
import Newsletter from "../components/NewsLetter";
import ServicesSection from "../components/ServicesSection";
import ShopByCategory from "../components/ShopByCategory";
import HomeHeader from "./HomeHeader";

const Home = () => {
  return (
    <>
    <HomeHeader/>
    <ShopByCategory/>
      <Hero />
      <FeaturedProducts />
      <ServicesSection />
      <DeliveryPartners />
      {/* <Newsletter /> */}
    </>
  );
};

export default Home;
