import React from "react";
import CarouselComp from "../../CarouselComp";
import CardsHome from "../../CardsHome";
import UserCart from "./UserCart";
import ScrollToTop from "../../ScrollToTop";

const UserHome = ({
  setCartItemCount,
  cartVisible,
  cartItemCount,
  onClose,
}) => {
  return (
    <div>
      <ScrollToTop />
      <CarouselComp />
      <CardsHome />
      {cartVisible && (
        <UserCart
          cartItemCount={cartItemCount}
          setCartItemCount={setCartItemCount}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default UserHome;
