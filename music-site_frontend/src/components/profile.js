import { Card } from "flowbite-react";
// import { useState } from "react";

function UserProfile(props) {
  const user = props.user

  return (

    <div className="max-w-sm">
      <Card>
        <div className="flex flex-col items-center pb-10">
          <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src={user.picture}
            alt="User image"
          />
          <h4 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.username}
          </h4>
          <h5 className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </h5>
          {/* <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Memeber since: {user.registrationDate}
          </h5> */}
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <a
              href="#"
              className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              User playlists
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Settings
            </a>
          </div>
        </div>
      </Card>
    </div>

  )
}

export default UserProfile;