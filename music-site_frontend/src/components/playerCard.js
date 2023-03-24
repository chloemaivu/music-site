import { Sidebar, Badge, Button } from "flowbite-react";
import React from "react";
// import { Link } from "react-router-dom";

function SidebarPlayer() {
  return (
    <Sidebar>
      <React.Fragment key=".0">
        <Sidebar.CTA>
          <div className="mb-3 flex items-center">
            <Badge color="warning">
              Spotify player
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
            <iframe
              style={{ borderRadius: 12 }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DWY4lFlS4Pnso?utm_source=generator"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              width="100%"
              height={250}
            />
            <a
              classname="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              href="#"
            ></a>
          </>
          Turn new navigation off
      </Sidebar.CTA>
    </React.Fragment>
    </Sidebar >
  )
}

export default SidebarPlayer;