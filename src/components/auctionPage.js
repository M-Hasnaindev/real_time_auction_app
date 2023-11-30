import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, push, remove } from "firebase/database";
import Dummy from "../assest/dummy.png";

function AuctionPage() {
  const [hideAuction, SetHideAction] = useState("none");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [auctionData, setAuctionData] = useState({
    about: "",
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    region: "",
    postalCode: "",
    bid: "",
    coverPhoto: "",
    startAndEndTime: [],
  });
  const [newBid, setNewBid] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const navigate = useNavigate();

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
    const auth = getAuth(app);
    const database = getDatabase(app);
    const auctionRef = ref(database, "auctioneers");

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;
        const userId = user.uid;

        setUserId(userId);
        setUserEmail(userEmail);

        get(auctionRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const auctionKey = Object.keys(data)[0];
              const auctionData = data[auctionKey];
              setAuctionData(auctionData);
              const currentTime = new Date().getTime();
              const endTime = new Date(auctionData.startAndEndTime[1]).getTime();
              if (currentTime > endTime) {
                const auctionRef = ref(database, `auctioneers/${auctionKey}`);
                remove(auctionRef , auctionData)
                  .then(() => {
                    console.log("Auction data deleted successfully!");
                  })
                  .catch((error) => {
                    console.error("Error deleting auction data:", error);
                  });
              } else {
              const timeDiff = endTime - currentTime;
              setTimeLeft(calculateRemainingTime(timeDiff));
              const timerId = setInterval(() => {
                const currentTime = new Date().getTime();
                const timeDiff = endTime - currentTime;
                setTimeLeft(calculateRemainingTime(timeDiff));
                if (currentTime > endTime) {
                  clearInterval(timerId);
                }
              }, 1000);

              return () => clearInterval(timerId);
            }
          }
          })
          .catch((error) => {
            console.log("Error getting data from Firebase:", error);
            toast.error("Error getting data from Firebase");
          });
      } else {
        console.log("User invalid");
        toast.error("User invalid");
      }
    });
  }, []);

  const calculateRemainingTime = (timeDiff) => {
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  };
  const handleBidSubmit = () => {
    const currentBid = parseFloat(auctionData.bid);
    const userBid = parseFloat(newBid);

    if (userBid > currentBid) {
      const database = getDatabase();
      const bidderRef = ref(database, "bidderData");

      const currentUserId = userId;
      const currentUserEmail = userEmail;
      const auctioneerEmail = auctionData.email;
      console.log(bidderRef);
      console.log({
        auctioneerEmail,
        email: currentUserEmail,
        userId: currentUserId,
        bidAmount: userBid,
      });

      push(bidderRef, {
        auctioneerEmail,
        email: currentUserEmail,
        userId: currentUserId,
        bidAmount: userBid,
      })
        .then(() => {
          toast.success("Bid placed successfully!");
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error placing bid:", error);
          toast.error("Error placing bid");
        });
    } else {
      toast.warning("Bid amount must be higher than the current bid");
    }
  };

  return (
    <>
      <div className="auction_page">
        <div className="page_of_auction">
          <div className="auction_ka_page">
            <div className="navbar">
              <Navbar />
            </div>
            <div
              className="auction_type_one"
              style={{ display: hideAuction === "none" ? "block" : "none" }}
            >
              <div className="image_and_button">
                <img
                  src={
                    auctionData.coverPhoto ? auctionData.coverPhoto : Dummy
                  }
                  alt=""
                />
                <div
                  className="live_now"
                  onClick={() => SetHideAction("display")}
                >
                  <button className="live">enjoy live auction</button>
                </div>
              </div>
            </div>
            <div
              className="auction_type_two"
              style={{ display: hideAuction === "none" ? "none" : "block" }}
            >
              <div className="full_auction">
                <div className="auction_data">
                  <img
                    src={
                      auctionData.coverPhoto ? auctionData.coverPhoto : Dummy
                    }
                    alt=""
                  />
                  <div className="data-list">
                    <h3>about: {auctionData.about}</h3>
                  </div>
                  <div className="data-list">
                    <h3>firstName: {auctionData.firstName}</h3>
                  </div>
                  <div className="data-list">
                    <h3>lastName: {auctionData.lastName}</h3>
                  </div>
                  <div className="data-list">
                    <h3>email: {auctionData.email}</h3>
                  </div>
                  <div className="data-list">
                    <h3>country: {auctionData.country}</h3>
                  </div>
                  <div className="data-list">
                    <h3>city: {auctionData.city}</h3>
                  </div>
                  <div className="data-list">
                    <h3>region: {auctionData.region}</h3>
                  </div>
                  <div className="data-list">
                    <h3>zip Code: {auctionData.postalCode}</h3>
                  </div>
                  <div className="data-list">
                    <h3>Time Left: {timeLeft ? `${timeLeft.hours}hr ${timeLeft.minutes}min ${timeLeft.seconds}sec` : "Loading time..."}</h3>
                    
                  </div>
                  <div className="data-list">
                    <div className="bid-now">
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                        <Form.Control
                          placeholder={
                            auctionData.bid
                              ? auctionData.bid
                              : "Please enter a bid"
                          }
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          value={newBid}
                          onChange={(e) => setNewBid(e.target.value)}
                        />
                        <button onClick={handleBidSubmit}>bid now</button>
                      </InputGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuctionPage;
