import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import MainNav from "./components/Header/MainNav";
import HeaderBanner from "./components/Header/HeaderBanner";
import MainModal from "./components/UI/MainModal";
import Footer from "./components/Footer/Footer";
import MainContent from "./components/MainContent/MainContent";

function App() {
  return (
    <BrowserRouter>
      <HeaderBanner />

      <MainModal />
      {/* <VideoBackground /> */}

      <MainNav />
      <Switch>
        <Route exact path="/">
          <div className="h-min-screen">
            <MainContent />
          </div>
        </Route>
        <Route exact path="/search">
          <div className="h-min-screen">
            <MainContent />
          </div>
        </Route>
        <Route exact path="/signin">
          <div className="h-min-screen">
            <MainContent />
          </div>
        </Route>
        <Route exact path="/profile">
          <div className="h-min-screen">
            <MainContent />
          </div>
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
