import React, { useState, useEffect } from "react";
import Navbar from '../components/navbar'
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHome } from "react-icons/fa";
import { getDatabase, ref, get } from "firebase/database";
import { initializeApp } from "firebase/app";

function AuctionDetailPage() {
  const [auctionData, setAuctionData] = useState([]);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyA1OxAS_1ZWH64PiJCVLSMk3A_bf0Tt_Fc",
      authDomain: "real-time-auction-app-host.firebaseapp.com",
      projectId: "real-time-auction-app-host",
      storageBucket: "real-time-auction-app-host.appspot.com",
      messagingSenderId: "741102543107",
      appId: "1:741102543107:web:3820a3be9d9d6146278936",
    };
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auctionref = ref(database, "auctioneers");
    get(auctionref)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const auction = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setAuctionData(auction);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error getting data from Firebase:", error);
      });
  }, []);
  return (
    <>
        <div className="auction_detail_page">
            <div className="navbar">
              <Navbar /> 
            </div>
            <div className="crum2">
            <div className="breadgram">
              <Breadcrumb>
                <Breadcrumb.Item href="#">
                  <FaHome />
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Auction Detail</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
            <div className="text-heading">
            <h2>You Bid Listing</h2>
            <p>view all the Biding Listing here.</p>
          </div>
          <div class="container">
            <div class="table">
              <div class="table-header">
                <div class="header__item">
                  <a id="name" class="filter__link" href="#">
                    About
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="wins"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    Email
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="draws"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    Bid Amount
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="losses"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    UserName
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="losses"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    Start and End Date
                  </a>
                </div>
              </div>
              <div class="table-content">
                {auctionData.map((item) => (
                  <div class="table-row" key={item.id}>
                    <div class="table-data">
                      {item.about} &nbsp; 
                    </div>
                    <div class="table-data">{item.email}</div>
                    <div class="table-data">{item.bid}</div>
                    <div class="table-data">{item.firstName} {item.lastName}</div>
                    <div class="table-data">{item.startAndEndTime}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default AuctionDetailPage