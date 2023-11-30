import main from "../assest/main.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const navigate = useNavigate();
    const [userUId, setUserUId] = useState('');

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSignin = async () => {
    const { email, password } = userData;

    if (email === "admin@gmail.com" && password === "Admin") {
      navigate("/admin-dashboard");
      toast.success("Welcome, Admin!");
    } else {
        const firebaseConfig = {
            apiKey: "AIzaSyA1OxAS_1ZWH64PiJCVLSMk3A_bf0Tt_Fc",
            authDomain: "real-time-auction-app-host.firebaseapp.com",
            projectId: "real-time-auction-app-host",
            storageBucket: "real-time-auction-app-host.appspot.com",
            messagingSenderId: "741102543107",
            appId: "1:741102543107:web:3820a3be9d9d6146278936"
          };
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db = getDatabase(app);
      
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        const userId = user.uid;
        const userRef = ref(db, `user/${userId}`);
        setUserUId(userId);

        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData2 = snapshot.val();
              console.log("User data:", userData2);
              if (userData2.userType === "user") {
                navigate("/home");
              } else if (userData2.userType === "admin") {
                navigate("/admin-dashboard");
              }
              toast.success(`${email} Welcome Back.`);
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            toast.error("Error retrieving user data. Please try again.");
          });
      } catch (error) {
        console.error("Error signing in: ", error);
        toast.error("Invalid email or password. Please try again.");
      }
    }
  };

  return (
    <>
      <h1 className="signup_heading">Login</h1>
      <div className="third_step">
        <div className="image_right">
          <img className="form_image" src={main} alt="image" />
        </div>
        <div className="left_form">
          <div className="sign-from">
            <div className="form-sign">
              <div className="sign">
                <label htmlFor="forEmail">Email:</label>
                <input
                  type="text"
                  name="email"
                  id="forEmail"
                  placeholder="example@gmail.com"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="sign">
                <label htmlFor="forPassword">Password:</label>
                <input
                  type="text"
                  name="password"
                  id="forPassword"
                  placeholder="**********"
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="sign">
                <button className="submit" type="submit" onClick={handleSignin}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;