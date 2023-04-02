import { useEffect, useState } from "react"
import { Card, Button, Badge } from "flowbite-react";
import CreatePlaylistModal from "./modalCreatePlaylist";
import PlaylistCard from "./playlistCard";

function UserProfile(props) {
  const [playlists, setPlaylists] = useState({})
  const [bioState, setBioState] = useState(true)
  const [bio, setBio] = useState("")

  const user = props.user

  useEffect(() => {
    const prependUserID = "USERID::" + window.localStorage.currentUserID
    props.client.getPlaylists(prependUserID).then((response) => { setPlaylists(response) })
  }, [])

  useEffect(() => {
    if (user?.bio?.length === 0) {
      setBioState(false)
    }
  }, [user])

  console.log(user.bio)

  const onClick = (id) => {
    let x = document.getElementById(id)
    if (x.style.display === "none") {
      x.style.display = "block"
    } else {
      x.style.display = "none"
    }
  }

  async function bioHandler(e) {
    e.preventDefault()
    props.client.setBio(
      window.localStorage.currentUserID,
      e.target.bio.value
    ).then((response) => setBio(response));
    setBioState(true);
  }

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
                Member since: <strong>{Date(user.createdAt).slice(4, 15)}</strong>
              </h5>
              <div className="mt-4 flex space-x-3 lg:mt-6">
                {bioState === true ? (
                  <>
                    <div>
                      <p id="userBio" className="grey-text borderGrey p-4">{user?.bio}</p>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                          className="mt-5"
                          outline={true}
                          gradientDuoTone="cyanToBlue"
                          type="button"
                          size="xl"
                          onClick={() => {
                            setBioState(false)
                          }}
                        >
                          update bio
                        </Button>
                      </div>
                    </div>

                  </>) : (
                  <>
                    <Button
                      id="createBioButton"
                      className="mt-5"
                      outline={true}
                      gradientDuoTone="cyanToBlue"
                      type="button"
                      size="xl"
                      onClick={() => {
                        onClick("createBioButton");
                        onClick("bioWriter")
                      }}
                    >
                      create a user bio
                    </Button>
                    <form id="bioWriter" style={{ display: "none" }} onSubmit={(e) => bioHandler(e)}>
                      <textarea name="bio"
                        placeholder={"Hi! My name is ..., I listen to a mix of everything except rap and country. My favourite arists is ..."}
                      ></textarea>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                          className="mt-5"
                          outline={true}
                          gradientDuoTone="cyanToBlue"
                          type="submit"
                          size="xl"
                        >
                          submit
                        </Button>
                        <Button
                          className="mt-5"
                          outline={true}
                          gradientDuoTone="cyanToBlue"
                          type="button"
                          size="xl"
                          onClick={()=> setBioState(true)}
                        >
                          cancel
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
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
          <Button onClick={() => onClick("createPlaylistModal")}>
            Create Playlist
          </Button>
          <CreatePlaylistModal client={props.client} />
        </div>


        {/* //////////// PLAYLISTS ////////////////////////////////////////////// */}
        <div className="playlistsArea">
          <h1 className="artistHeading text-center py-3">My Playlists</h1>
          {playlists?.length > 0 ?
            playlists?.map((playlist) => {
              return (
                <PlaylistCard key={playlist._id} playlist={playlist} client={props.client} />
              )
            })
            : <></>}
        </div>
      </div>

    </>
  )
}

export default UserProfile;