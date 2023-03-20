import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// component imports
import Homepage from "./components/homepage";
import HomepagePreLogin from "./components/hompagePreLogin";
import RegisterView from "./components/registration";
import VantaFooter from "./components/footer";
import NavbarLoggedIn from "./components/navbar2";
import NavbarPreLogin from "./components/navbar";
import Login from "./components/login";
import SidebarPlayer from "./components/playerCard";
import SpotifyWidget from "./components/spotifyPlayer";
import UserProfile from "./components/profile";

import { ApiClient } from "./ApiClient";


function App() {
  const client = new ApiClient(
    () => token,
    () => logout
  );
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});

  const login = (token) => {
    window.localStorage.setItem("token", token);
    setToken(token);
    setAuthenticated(true);
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setToken(undefined);
    setAuthenticated(false);
  };

  const refreshPage = () => {
    console.log("the page should now reload!");
    window.location.reload(true);
  };

  const getUserData = async (username) => {
    const user = await client.getUserData(username).then((response) => setUserData(response.data))
  }

  useEffect(() => {
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    // TO DO: change based on logged in user
    getUserData("chloe")
  }, [])
  return token && authenticated ? (
    <>
      <NavbarLoggedIn
        token={(token) => setToken(token)}
        authenticated={(authenticated) => setAuthenticated(authenticated)}
        refresh={() => refreshPage()}
        user={userData}
      />
      <div className="page">
      <Routes>
        <Route path="/" element={<Homepage client={client}/>} />
        <Route path="/player" element={<SpotifyWidget />} />
        <Route path="/profile" element={<UserProfile user={userData} />} />
      </Routes>
      </div>
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
          element={<Login client={client} loggedIn={(token) => login(token)} />}
        />
        <Route path="/register" element={<RegisterView client={client} />} />
      </Routes>
      </div>
      <VantaFooter />
    </>
  );
}
export default App;

// Example from last week
// function AppRoutes({ isLoggedIn, setIsLoggedIn, isAdmin }) {
//   if (getToken()) {
//       isLoggedIn = true;
//   }

//   return (
//       <Routes>
//           <Route path="/" element={isLoggedIn ? <HomepageView /> : <Navigate to="/login" />} />
//           <Route path="/events" element={isLoggedIn ? <EventsView /> : <Navigate to="/login" />} />
//           <Route path="/admin" element={isLoggedIn && isAdmin ? <AdminView /> : <Navigate to="/login" />} />
//           <Route path="/login" element={<LoginView setIsLoggedIn={setIsLoggedIn} />} />
//           <Route path="/register" element={<RegisterView setIsLoggedIn={setIsLoggedIn} />} />
//       </Routes>
//   )
// }
