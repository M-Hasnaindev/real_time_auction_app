import React from "react";
import Navbar from "../components/navbar";
import Breadcrum from "../components/breadcrum";
import ProductDetail from "../components/productDetail";
import ProductListing from "../components/productListing";
import ProductPage from "../components/productPage";


function BrowserListingPage() {
  return (
    <>
      <div className="web-container">
        <div className="navbar">
          <Navbar />
        </div>
        <div
          className="breadcrums"
        >
          <Breadcrum />
        </div>
        <ProductPage />
        <ProductListing />

      </div>
    </>
  );
}

export default BrowserListingPage;
