import React from "react";
import Header from "../elements/Header";
import Main from "../elements/Main";
import Footer from "../elements/Footer";

const HomePage = ({ match }) => (
  <div id="home-page">
    <Header />
    <Main />
    <Footer />
  </div>
);

export default HomePage;
