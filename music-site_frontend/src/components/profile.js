import { Card, Button, Badge } from "flowbite-react";

function UserProfile(props) {
  const user = props.user

  return (
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
              // <h4> admin 🖥️ </h4> 
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
              {/* <a
                href="#"
                className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                User playlists
              </a> */}
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
              {/* <a
                href="#"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                Settings
              </a> */}
            </div>
          </div>
        </Card>
      </div>
  )
}

export default UserProfile;