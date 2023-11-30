import React, { useState } from "react";
import Navbar from "./components/navbar";
import HomePageProduct from "./components/homePageProduct";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { DatePicker, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

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
const storage = getStorage(app);

function Home() {
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState("hideForm");
  const [formData, setFormData] = useState({
    about: "",
    coverPhoto: "",
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    streetAddress: "",
    city: "",
    region: "",
    postalCode: "",
    bid: "",
    startAndEndTime: [],
  });

  const handleChange = (e) => {
    if (e.target.name === "coverPhoto") {
      const file = e.target.files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: file,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target?.name ?? ""]: e.target?.value ?? "",
      }));
    }
  };

  const handleNavigateAuctionBidder = () => {
    navigate("/auction");
  };

  const handleSave = async () => {
    try {
      console.log("File Data:", formData.coverPhoto);
      const storageReference = storageRef(
        storage,
        "product-photos/" + formData.coverPhoto.name
      );
      await uploadBytes(storageReference, formData.coverPhoto);

      const downloadURL = await getDownloadURL(storageReference);

      if (showForm === "form") {
        const auctioneersRef = ref(database, "auctioneers");
        console.log(auctioneersRef);
        const newAuctioneerRef = push(auctioneersRef, {
          ...formData,
          coverPhoto: downloadURL,
          startAndEndTime: formData.startAndEndTime.map(date => date.toString()),
        });

        console.log("Auctioneer data saved successfully");
        toast.success("Auctioneer details are saved successfully");
      } else {
        const biddersRef = ref(database, "bidders");
        const newBidderRef = push(biddersRef, {
          ...formData,
          coverPhoto: downloadURL,
          startAndEndTime: formData.startAndEndTime.map(date => date.toString()),
        });

        console.log("Bidder data saved successfully");
        toast.success("Bidder details are saved successfully");
      }
      setFormData({
        about: "",
        coverPhoto: "",
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        streetAddress: "",
        city: "",
        region: "",
        postalCode: "",
        bid: "",
        startAndEndTime: [],
      });
      setShowForm("hideForm");
      navigate("/home");
    } catch (error) {
      console.error("Error saving data:", error, formData);
    }
  };

  return (
    <>
      <div className="web-container">
        <div className="navbar">
          <Navbar />
          <div className="add_auction">
            <div className="btn_auction">
              <button className="add" onClick={() => setShowForm("form")}>
                Auctioner
              </button>
              <button className="add bid" onClick={handleNavigateAuctionBidder}>
                Bidder
              </button>
            </div>
          </div>
        </div>
        <form
          style={{ display: showForm === "hideForm" ? "none" : "block" }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Add Auction
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    About
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                      onChange={handleChange}
                      value={formData.about}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Give a description of your product and auction.
                  </p>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="coverPhoto"
                            type="file"
                            className="sr-only"
                            onChange={handleChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={formData.firstName}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={formData.lastName}
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={formData.country}
                    >
                      <option>pakistan</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="countdown-timer"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Start and End Time
                  </label>
                  <Space direction="vertical" size={12}>
                    <RangePicker showTime 
                    onChange={(dates) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        startAndEndTime: dates,
                      }))
                    }/>
                  </Space>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="streetAddress"
                      id="streetAddress"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={formData.streetAddress}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={formData.city}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={formData.region}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={formData.postalCode}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="starting-payment"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Starting Bid Ammount $
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="bid"
                      id="bid"
                      autoComplete="bid-ammount"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={formData.bid}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
        <div
          className="home-page"
          style={{ display: showForm === "hideForm" ? "block" : "none" }}
        >
          <HomePageProduct />
        </div>
      </div>
    </>
  );
}

export default Home;
