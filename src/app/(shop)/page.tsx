import Category from "@/components/home/category/Category";
import FeatureProduct from "@/components/home/featured/FeatureProduct";
import Hero from "@/components/home/hero/Hero";

const MainApp = () => {
  return (
    <>
      <Hero />
      <Category />
      <FeatureProduct />

      {/* Mobile nav space */}
      <div className="block lg:hidden w-full h-20" />
    </>
  );
};

export default MainApp;
