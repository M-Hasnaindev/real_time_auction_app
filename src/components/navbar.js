import React, { useState } from "react";
import logo from "../assest/logo.jpg";
import { useNavigate } from "react-router-dom";
import ProductPage from "../components/productPage";
import ProductList from "../components/productListing"; 

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const showAuction = () => {
    navigate("/auction");
  };
  const showHome = () => {
    navigate("/home");
  };
  const showBrowserListingPage = () => {
    navigate(`/BrowserListingPage`); 
  };
  const ShowAuctionDetail = () => {
    navigate(`/auction-detail`); 
  };
  return (
    <>
      <div className="navbar">
        <div className="nav">
          <div className="logo">
            <img className="web_logo" src={logo} alt="Logo" />
          </div>
          <div className="Navbar">
            <ul>
              <li className="niche_lana_h" onClick={showHome}>
                Home
              </li>
              <li className="niche_lana_h" onClick={showBrowserListingPage}>
                Browse listings
              </li>
              <li className="niche_lana_h">Sell an item</li>
              <li className="niche_lana_h" onClick={ShowAuctionDetail}>Auction Detail</li>
              <li className="niche_lana_h" onClick={showAuction}>
                Auctions
              </li>
            </ul>
          </div>
          <div className="two-option">
            <div className="search">
              <input
                className="search"
                type="search"
                placeholder="🔍 Search Listings"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* <div className="user_profile">
                    <select name="profile" id="userId">
                        <option value="profile">Logout</option>
                    </select>
                </div> */}

              
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
