import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll position to top
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
