import { Sidebar, Badge, Button } from "flowbite-react";
import React from "react";
import SpotifyWidget from "./spotifyPlayer";
// import { Link } from "react-router-dom";

function SidebarPlayer(props) {
  const songURI = props.songURI
  const type = props.type

  return (
    <Sidebar className="w-full">
      <React.Fragment key=".0">
        <Sidebar.CTA>
          <div className="mb-3 flex items-center">
            <Badge color="warning">
              Spotify Player
            </Badge>
            <div className="-m-1.5 ml-auto">
              <Button
                aria-label="Close"
                outline
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    fillRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </div>
          <>
          <SpotifyWidget type={type} songURI={songURI}/>
          Song Lyrics Here 
          </>
      </Sidebar.CTA>
    </React.Fragment>
    </Sidebar >
  )
}

export default SidebarPlayer;