import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainNav from "./components/Header/MainNav";
import HeaderBanner from "./components/Header/HeaderBanner";
import MainModal from "./components/UI/MainModal";
import VideoBackground from "./components/Header/VideoBackground";
import MainContent from "./components/MainContent/MainContent";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <HeaderBanner />
      <MainModal />
      <VideoBackground />

      <Switch>
        <Route exact path="/">
          <div className="h-min-screen">
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
