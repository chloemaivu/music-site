import { React, useState, useEffect } from 'react';
import { Timeline, Card, Avatar, Badge } from "flowbite-react";
import { CalendarIcon } from "@heroicons/react/24/solid";

function CommunityPage(props) {
    const user = props.user
    const [playlists, setPlaylists] = useState({})

    useEffect(() => {
      props.client.getPlaylists(window.localStorage.currentUserID).then((response) => setPlaylists(response))
    }, [])

    function Calendar() {
        return (
            <div>
            <CalendarIcon className="h-6 w-6"/>
        </div>
        )
    }

  return (
    <>
    <div className="flex flex-row items-center justify-center">
        <Avatar className="rounded-2xl"
        img={user.picture}
        rounded={true}/>
            <div className="flex-col mb-1 text-2xl font-medium dark:text-white p-2">
                  {(user.isAdmin === true) ? (
                    <Badge
                      size="sm"
                      className="adminBadge">
                      <h6 className="uppercase">admin 🔒</h6>
                    </Badge>
                  ) : (<></>)}
            </div>
        <h2 className="mb-1 text-3xl font-medium dark:text-white p-2 text-center mt-6">
            {user.username}'s Timeline
        </h2>
    </div>
    <div className="timelineContainer my-12">
    <Timeline className="userContainer pl-8">
        <Timeline.Item>
        <Timeline.Point icon={Calendar} />
            <Timeline.Content>
            <Timeline.Time>
                Hardcoded Date
            </Timeline.Time>
            <Timeline.Title>
                Some hard coded title
            </Timeline.Title>
            <Timeline.Body>
                <Card href="#" className="playlist bg-gray-400 w-96">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Playlist element goes here
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Tracks are rendered here
                    </p>
                </Card>
            </Timeline.Body>
            </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
        <Timeline.Point icon={Calendar} />
            <Timeline.Content>
            <Timeline.Time>
                Previous Date
            </Timeline.Time>
            <Timeline.Title>
                Some hard coded title
            </Timeline.Title>
            <Timeline.Body>
                <Card href="#" className="playlist bg-gray-400 w-96">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Another playlist element goes here
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Tracks are rendered here
                    </p>
                </Card>
            </Timeline.Body>
            </Timeline.Content>
        </Timeline.Item>
{/* MAP THROUGH TIMELINE ITEM HERE */}
<Timeline.Item>
        <Timeline.Point icon={Calendar} />
            <Timeline.Content>
            <Timeline.Time>
                Previous Date
            </Timeline.Time>
            <Timeline.Title>
                Some hard coded title
            </Timeline.Title>
            <Timeline.Body>
                <Card href="#" className="playlist bg-gray-400 w-96">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Another playlist element goes here
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Tracks are rendered here
                    </p>
                </Card>
            </Timeline.Body>
            </Timeline.Content>
        </Timeline.Item>
    </Timeline>
    </div>
    </>
  )
}

export default CommunityPage;