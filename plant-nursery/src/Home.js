import React from "react";
import CarouselComp from "./CarouselComp";
import CardsHome from "./CardsHome";
import ScrollToTop from "./ScrollToTop";

const Home = () => {
  return (
    <div>
      <div style={{ paddingTop: "55px" }}>
        <ScrollToTop />
        <CarouselComp />
        <CardsHome />
      </div>
    </div>
  );
};

export default Home;
