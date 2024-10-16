import DeliveryPartners from "../components/DeliveryPartners";
import FeaturedProducts from "../components/FeaturedProducts";
import Hero from "../components/Hero";
import Newsletter from "../components/NewsLetter";
import Review from "../components/Review";
import ServicesSection from "../components/ServicesSection";
import Cards from "../pages/Cards";
import ShopByCategory from "../components/ShopByCategory";
import HomeHeader from "./HomeHeader";
import ScrollToTop from "react-scroll-to-top"

const Home = () => {
  return (
    <>
      <HomeHeader />
      <Cards />
      <ShopByCategory />
      <Hero />
      <FeaturedProducts />
      <ServicesSection />
      <DeliveryPartners />
      <Review />
      {/* <Newsletter /> */}
      <ScrollToTop style={{ backgroundColor: 'grey' }} smooth />
    </>
  );
};

export default Home;
