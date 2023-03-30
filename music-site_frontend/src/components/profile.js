import { useEffect, useState } from "react"
import { Card, Button, Badge } from "flowbite-react";
import CreatePlaylistModal from "./modalCreatePlaylist";
import PlaylistCard from "./playlistCard";

function UserProfile(props) {
  const [playlists, setPlaylists] = useState({})

  const user = props.user

  useEffect(() => {
    props.client.getPlaylists(window.localStorage.currentUserID).then((response) => setPlaylists(response))
  }, [])

  // console.log(playlists)
  // console.log(playlists[0].name)
  // console.log(playlists[0].uri[0])

  return (
    <>
      {/* ///////////// USER CARD ///////////////////////////////////////////// */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
        <div className="max-w-sm">
          <Card className="background-grey">
            <div className="flex flex-col items-center pb-10">
              <img
                className="userImage mb-3 rounded-full shadow-lg"
                src={user.picture}
                alt="User image"
              />
              <div className="flex flex-row">
                <h2 className="flex-col mb-1 text-2xl font-medium dark:text-white p-2">
                  {user.username}
                </h2>
                <div className="flex-col mb-1 text-2xl font-medium dark:text-white p-2">
                  {(user.isAdmin === true) ? (
                    <Badge
                      size="sm"
                      className="adminBadge">
                      <h6 className="uppercase">admin 🔒</h6>
                    </Badge>
                  ) : (<></>)}
                </div>
              </div>
              <h5 className="text-sm dark:text-gray-400 p-2">
                {user.email}
              </h5>
              <h5 className="mb-1 text-xl font-medium dark:text-white p-2">
                Member since: <strong>{user.registrationDate}</strong>
              </h5>
              <div className="mt-4 flex space-x-3 lg:mt-6">
                <Button
                  className="mt-5"
                  outline={true}
                  gradientDuoTone="cyanToBlue"
                  type="button"
                  size="xl"
                >
                  Playlists
                </Button>
                <Button
                  className="mt-5"
                  outline={true}
                  gradientDuoTone="cyanToBlue"
                  type="button"
                  size="xl"
                  href="/user-settings"
                >
                  Settings
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <CreatePlaylistModal client={props.client} />
        </div>
        <div>
          {/* {playlists.map(playlist => {
            return (
              <p className="white-text text-3xl">{playlist.name}</p>
            )
          }
          )} */}
          {/* <Button
            className="mt-5"
            outline={true}
            gradientDuoTone="cyanToBlue"
            type="button"
            size="xl"
            onClick={() => props.client.appendPlaylist("chloe's hits", "spotify:track:1Qrg8KqiBpW07V7PNxwwwL")}
          >
            add to playlist
          </Button> */}
        </div>

        <div className="playlistsArea">
          <h1 className="artistHeading text-center py-3">My Playlists</h1>
          {playlists?.length > 0 ? 
            playlists?.map((playlist) => {
              return <PlaylistCard playlist={playlist} />;
            })
          : <></>}

        </div>
      </div>
      {/* //////////// PLAYLISTS ////////////////////////////////////////////// */}
    </>
  )
}

export default UserProfile;