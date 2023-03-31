import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

// component imports
import ArtistPage from "./components/artistPage";
import CommunityPage from "./components/communityPage";
import Homepage from "./components/homepage";
import HomepagePreLogin from "./components/hompagePreLogin";
import RegisterView from "./components/registration";
import VantaFooter from "./components/footer";
import NavbarLoggedIn from "./components/navbar2";
import NavbarPreLogin from "./components/navbar";
import Login from "./components/login";
import SidebarPlayer from "./components/playerCard";
import UserProfile from "./components/profile";
import PlayerIcon from "./resources/player_icon.svg"

import { ApiClient } from "./ApiClient";
import UserSettings from "./components/userSettings";
import HomeRouter from "./components/homeRouter";


function App() {
  const navigate = useNavigate()
  const client = new ApiClient(
    () => token,
    () => logout
  );
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [currentUserID, setCurrentUserID] = useState(window.localStorage.getItem("currentUserID"));
  const [currentUserPlaylists, setCurrentUserPlaylists] = useState(window.localStorage.getItem("userPlaylists"));

  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});

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
    window.localStorage.removeItem("filter")
    setToken(undefined);
    setAuthenticated(false);
    navigate("/");
  };

  // const refreshPage = () => {
  //   console.log("the page should now reload!");
  //   window.location.reload(true);
  // };

  // request login in users data based on their id in local storage
  const getUserData = async (userID) => {
    await client.getUserData(userID)
      .then((response) => setUserData(response.data))
  };

  const getUserPlaylists = async (userID) => {
    const userPlaylists = await client.getPlaylists(userID);
    console.log(userPlaylists)
    window.localStorage.setItem("userPlaylists", userPlaylists)    
  }

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
      const prependUserID = "USERID::" + currentUserID
      getUserPlaylists(prependUserID)
    }
  }, [token]);

  const sidebarToggle = (element) => {
    let x = document.getElementById(element)
    if (x.style.display === "block") {
      x.style.display = "none"
    } else {
      x.style.display = "block"
    }
  }

  return token && authenticated ? (
    <>
      <NavbarLoggedIn
        token={(token) => setToken(token)}
        authenticated={(authenticated) => setAuthenticated(authenticated)}
        logout={() => logout()}
        user={userData}
      />
      <Button
        className="mt-5 topleft"
        outline={true}
        gradientDuoTone="cyanToBlue"
        type="submit"
        size="xl"
        onClick={() => sidebarToggle("sidebar")}
      >
        <img src={PlayerIcon} title="toggle player" width="50px" />
      </Button>
      <Routes>
        <Route path="/" element={<HomeRouter />}/> 
        <Route path="/home" element={<div className="page"><Homepage client={client} getUserData={() => getUserData()} songURI={(songURI) => setSongURI(songURI)} type={(type) => setType(type)} /> </div>} />
        <Route path="/profile" element={<div className="page center"><UserProfile client={client} user={userData} /> </div>} />
        <Route path="/user-settings" element={<div className="page center"><UserSettings user={userData} client={client} /> </div>} />
        <Route path="/artist/:artistId" element={<div className="page"> <ArtistPage client={client} /> </div>} />
        <Route path="/community" element={<div className="page"> <CommunityPage client={client} user={userData} /> </div>} />
      </Routes>
      <SidebarPlayer type={type} songURI={songURI} client={client} />
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
