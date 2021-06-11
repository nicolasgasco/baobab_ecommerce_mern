import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainNav from "./components/Header/MainNav";
import HeaderBanner from "./components/Header/HeaderBanner";
import MainModal from "./components/UI/MainModal";
import Footer from "./components/Footer/Footer";
import AuthProvider from "./store/AuthProvider";
import MainContent from "./components/MainContent/MainContent";
import ModalProvider from "./store/ModalProvider";

function App() {
  return (
    <BrowserRouter>
      <HeaderBanner />

      <ModalProvider>
        <AuthProvider>
          <MainModal />
          {/* <VideoBackground /> */}

          <Switch>
            <Route exact path="/">
              <div className="h-min-screen">
                <MainNav />
                <MainContent />
              </div>
            </Route>
          </Switch>
        </AuthProvider>
      </ModalProvider>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
