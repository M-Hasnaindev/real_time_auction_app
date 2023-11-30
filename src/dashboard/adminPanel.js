import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHome } from "react-icons/fa";
import { getDatabase, ref, get, remove, push} from "firebase/database";
import { initializeApp } from "firebase/app";

function AdminPanel() {
  const [auctionData, setAuctionData] = useState([]);
  const [sellData, setSellData] = useState([]);

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
    const bidderRef = ref(database, "bidderData");
    get(bidderRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const bidding = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setAuctionData(bidding);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error getting data from Firebase:", error);
      });
  }, []);
  const handleAccept = (item) => {
    const database = getDatabase();
    const bidderRef = ref(database, "bidderData");
    const sellRef = ref(database, "sellData");
    push(sellRef, item)
      .then(() => {
        console.log("Bid accepted and saved to sellData");
      })
      .catch((error) => {
        console.error("Error saving bid to sellData:", error);
      });
    remove(bidderRef, item)
      .then(() => {
        console.log("Bid removed from bidderData");
      })
      .catch((error) => {
        console.error("Error removing bid from bidderData:", error);
      });
  };
  const [showSoldListing , SetShowSoldListing] = useState("sold")
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
    const sellref = ref(database, "sellData");
    get(sellref)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const sell = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setSellData(sell);
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
      <div className="admin-dashboard">
        <div className="dashboard">
          <div className="navbar">
            <Navbar />
          </div>
          <div className="crum2">
            <div className="breadgram">
              <Breadcrumb>
                <Breadcrumb.Item href="#">
                  <FaHome />
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Your Listing Dashboard</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          <div className="text-heading">
            <h2>Listing Dashboard</h2>
            <p>view all the listing thing you have created.</p>
          </div>
          <div className="new-menu">
            <ul>
              <li className="nav-new-menu" onClick={() => SetShowSoldListing("rev")}>All Listings</li>
              <li className="nav-new-menu" onClick={() => SetShowSoldListing("all")}>Sold Listings</li>
              <li className="nav-new-menu">Expired Listings</li>
              <li className="nav-new-menu">Your Bid</li>
            </ul>
          </div>
          <div class="container" style={{ display: showSoldListing === "sold" ? "block" : "none" }}>
            <div class="table">
              <div class="table-header">
                <div class="header__item">
                  <a id="name" class="filter__link" href="#">
                    Auctioneer Email
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="wins"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    BidAmount
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="draws"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    Bidder Email
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="losses"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    User ID
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="total"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    Accept
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="total"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    Reacject
                  </a>
                </div>
              </div>
              <div class="table-content">
                {auctionData.map((item) => (
                  <div class="table-row" key={item.id}>
                    <div class="table-data">
                      {item.auctioneerEmail} &nbsp; 
                    </div>
                    <div class="table-data">{item.bidAmount}</div>
                    <div class="table-data">{item.email}</div>
                    <div class="table-data">{item.userId}</div>
                    <div class='table-data'>
                      <button className="acc" onClick={() => handleAccept(item)}>Accept</button>
                    </div>
                    <div class='table-data'>
                      <button className="dec">Decline</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div class="container sold" style={{ display: showSoldListing === "sold"? "none" : "block" }}>
            <div class="table">
              <div class="table-header">
                <div class="header__item">
                  <a id="name" class="filter__link" href="#">
                    Auctioneer Email
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="wins"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    BidAmount
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="draws"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    Bidder Email
                  </a>
                </div>
                <div class="header__item">
                  <a
                    id="losses"
                    class="filter__link filter__link--number"
                    href="#"
                  >
                    User ID
                  </a>
                </div>
              </div>
              <div class="table-content">
                {sellData.map((item) => (
                  <div class="table-row" key={item.id}>
                    <div class="table-data">
                      {item.auctioneerEmail} &nbsp; 
                    </div>
                    <div class="table-data">{item.bidAmount}</div>
                    <div class="table-data">{item.email}</div>
                    <div class="table-data">{item.userId}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white py-24 sm:py-32 in-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                Trusted by the world’s most innovative teams
              </h2>
              <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                <img
                  className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                  src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
                  alt="Transistor"
                  width={158}
                  height={48}
                />
                <img
                  className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                  src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
                  alt="Reform"
                  width={158}
                  height={48}
                />
                <img
                  className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                  src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
                  alt="Tuple"
                  width={158}
                  height={48}
                />
                <img
                  className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                  src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
                  alt="SavvyCal"
                  width={158}
                  height={48}
                />
                <img
                  className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                  src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                  alt="Statamic"
                  width={158}
                  height={48}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
