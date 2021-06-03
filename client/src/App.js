import MainNav from "./components/layout/nav/MainNav/MainNav";
import HeaderBanner from "./components/UI/modals/HeaderBanner";
import MainModal from "./components/UI/modals/MainModal";
import StoreSearchbar from "./components/UI/search/StoreSearchbar"
import ProductCard from "./components/layout/cards/ProductCard";
import ProductCarousel from "./components/UI/carousel/ProductCarousel";

function App() {
  return (
    <>
      <HeaderBanner />
      <MainNav />
      <StoreSearchbar />
      <ProductCard />
      <MainModal />
    </>
  );
}

export default App;
