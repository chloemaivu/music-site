import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

// component imports
import ArtistPage from "./components/artistPage";
import Homepage from "./components/homepage";
import HomepagePreLogin from "./components/hompagePreLogin";
import RegisterView from "./components/registration";
import VantaFooter from "./components/footer";
import NavbarLoggedIn from "./components/navbar2";
import NavbarPreLogin from "./components/navbar";
import Login from "./components/login";
import SidebarPlayer from "./components/playerCard";
import UserProfile from "./components/profile";

import { ApiClient } from "./ApiClient";


function App() {
  const navigate = useNavigate()
  const client = new ApiClient(
    () => token,
    () => logout
  );
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [currentUserID, setCurrentUserID] = useState(window.localStorage.getItem("currentUserID"));

  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});

  const [artistURI, setArtistURI] = useState("")
  const [songURI, setSongURI] = useState("")
  const [type, setType] = useState("")

  const login = (token, userID) => {
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("currentUserID", userID)
    setToken(token);
    setCurrentUserID(userID);
    setAuthenticated(true)
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("currentUserID");
    window.localStorage.removeItem("spotifyURI");
    window.localStorage.removeItem("filter");
    setToken(undefined);
    setAuthenticated(false);
    navigate("/");
  };

  // request login in users data based on their id in local storage
  const getUserData = async (userID) => {
    await client.getUserData(userID)
      .then((response) => setUserData(response.data))
  };

  // authenticate user with token
  useEffect(() => {
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  // get data of logged in user on login
  useEffect(() => {
    if (token) {
      getUserData(currentUserID)
    }
  }, [token]);

  console.log("App.js reports a passed up artist URI of " + artistURI)

  return token && authenticated ? (
    <>
      <NavbarLoggedIn
        token={(token) => setToken(token)}
        authenticated={(authenticated) => setAuthenticated(authenticated)}
        logout={() => logout()}
        user={userData}
      />
      <Routes>
        <Route path="/" element={<div className="page"><Homepage client={client} getUserData={() => getUserData()} artistURI={(artistURI) => setArtistURI(artistURI)} songURI={(songURI) => setSongURI(songURI)} type={(type) => setType(type)} /></div>} />
        <Route path="/profile" element={<div className="page center"><UserProfile user={userData} /> </div>} />
        <Route path="/artist" element={<div className="page"> <ArtistPage client={client} artistURI={artistURI} /> </div>} />
      </Routes>
      <SidebarPlayer type={type} songURI={songURI} />
      <VantaFooter />
    </>
  ) : (
    <>
      {" "}
      <NavbarPreLogin />
      <div className="page">
        <Routes>
          <Route path="/" element={<HomepagePreLogin />} />
          <Route
            path="/login"
            element={<Login client={client} loggedIn={(token, userID) => login(token, userID)} />}
          />
          <Route path="/register" element={<RegisterView client={client} />} />
        </Routes>
      </div>
      <VantaFooter />
    </>
  );
}
export default App;
