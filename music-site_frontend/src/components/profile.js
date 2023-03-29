import { Card, Button, Badge } from "flowbite-react";
import CreatePlaylistModal from "./modalCreatePlaylist";

function UserProfile(props) {
  const user = props.user

  return (
    <>
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
          <Button
            className="mt-5"
            outline={true}
            gradientDuoTone="cyanToBlue"
            type="button"
            size="xl"
            onClick={() => props.client.appendPlaylist("LORN", "spotify:track:5P5dA0hS21lA2Ys9Hm9EZI")}
          >
            add to playlist
          </Button>
        </div>
      </div>
    </>
  )
}

export default UserProfile;