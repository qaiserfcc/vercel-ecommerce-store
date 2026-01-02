import Banner from '@/components/user/Banner';
import BestSellers from '@/components/user/BestSellers';
import ProductBundles from '@/components/user/ProductBundles';
import NewArrivals from '@/components/user/NewArrivals';
import Brands from '@/components/user/Brands';
import AboutSection from '@/components/user/AboutSection';

export default function Home() {
  return (
    <div>
      <Banner />
      <div className="container mx-auto px-4">
        <BestSellers />
        <ProductBundles />
        <NewArrivals />
        <Brands />
        <AboutSection />
      </div>
    </div>
  );
}
