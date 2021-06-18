import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import MainNav from "./components/Header/MainNav";
import HeaderBanner from "./components/Header/HeaderBanner";
import MainModal from "./components/UI/MainModal";
import Footer from "./components/Footer/Footer";
import MainContent from "./components/MainContent/MainContent";

// Stripe related
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// This key is public, no need to hid it
const promise = loadStripe(
  "pk_test_51J3L3sID7BWQ1tRhAZSV4MKb1ZUS23HKoXXF3R1zdKj2kbjh03UQqvfFgSVDWakLvATspzNOBELpa7k41w6OYa2C00PDmPXqgR"
);

function App() {
  return (
    <BrowserRouter>
      <Elements stripe={promise}>
        <HeaderBanner />

        <MainModal />
        {/* <VideoBackground /> */}

        <MainNav />
        <Switch>
          <Route exact path="/">
            <div className="min-h-screen">
              <MainContent />
            </div>
          </Route>
          <Route exact path="/search">
            <div className="min-h-screen">
              <MainContent />
            </div>
          </Route>
          <Route exact path="/signin">
            <div className="min-h-screen">
              <MainContent />
            </div>
          </Route>
          <Route exact path="/profile">
            <div className="min-h-screen">
              <MainContent />
            </div>
          </Route>
          <Route exact path="/password">
            <div className="min-h-screen">
              <MainContent />
            </div>
          </Route>
          <Route exact path="/cart">
            <div className="min-h-screen">
              <MainContent />
            </div>
          </Route>

          <Route exact path="/checkout">
            <div className="min-h-screen">
              <MainContent />
            </div>
          </Route>

          <Route exact path="/success">
            <div className="min-h-screen">
              <MainContent />
            </div>
          </Route>

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>

        <Footer />
      </Elements>
    </BrowserRouter>
  );
}

export default App;
