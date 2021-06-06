import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainNav from "./components/UI/MainNav";
import HeaderBanner from "./components/UI/HeaderBanner";
import MainModal from "./components/UI/MainModal";
import VideoBackground from "./components/UI/VideoBackground";
import MainContent from "./components/MainContent/MainContent";
import HeroMain from "./components/UI/HeroMain";
import Footer from "./components/UI/Footer";

function App() {
  return (
    <BrowserRouter>
      <HeaderBanner />
      <MainModal />
      <VideoBackground />

      <Switch>
        <Route exact path="/">
          <div>
            <MainNav />
            <MainContent />
          </div>
        </Route>
      </Switch>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
