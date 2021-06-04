import MainNav from "./components/UI/MainNav";
import HeaderBanner from "./components/UI/HeaderBanner";
import MainModal from "./components/UI/MainModal";
import VideoBackground from "./components/UI/VideoBackground";
import MainContent from "./components/MainContent/MainContent";

function App() {
  return (
    <>
      <HeaderBanner />
      <MainModal />

      <VideoBackground />
      <MainNav />
      <MainContent />
    </>
  );
}

export default App;
