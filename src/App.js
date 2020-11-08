import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import NavbarMain from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TourPage from "./pages/TourPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import WishlistPage from "./pages/WishlistPage";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="App">
      <NavbarMain user={user} />
      <Router>
        <HomePage path="/" />
        <TourPage path="tour" />
        <SignupPage path="/auth/signup" />
        <LoginPage path="/auth/login" />
        <LogoutPage path="/auth/logout" />
        <Dashboard path="/dashboard" />
        <WishlistPage path="/wishlist" />
      </Router>
    </div>
  );
};

export default App;
