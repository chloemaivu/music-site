import { Sidebar, Badge, Button } from "flowbite-react";
import React from "react";
import SpotifyWidget from "./spotifyPlayer";

function SidebarPlayer(props) {
  const songURI = props.songURI
  const type = props.type

  return (
    <>
      <div id="sidebar" className="border" style={{ display: "block" }}>
        {window.localStorage.spotifyURI && window.localStorage.filter ? (
          <>
            <div className="p-4">
              <SpotifyWidget type={type} songURI={songURI} />
            </div>
            <p className="white-text center">
              Song Lyrics Here
            </p>
          </>
        ) : (
          <>
            <br />
            <p className="grey-text center text-xl"> Use the search function to look for music you like. When you find something good, you can queue it up to play here!</p>
            <br />
          </>
        )
        }

      </div>


    </>
  )
}

export default SidebarPlayer;