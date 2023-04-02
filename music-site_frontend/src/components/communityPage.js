import { React, useState, useEffect } from 'react';
import { Timeline, Avatar, Badge } from "flowbite-react";
import { CalendarIcon } from "@heroicons/react/24/solid";
import PlaylistCard from "./playlistCard";

function CommunityPage(props) {
    const user = props.user
    const [playlists, setPlaylists] = useState({})

    useEffect(() => {
        const prependUserID = "USERID::" + window.localStorage.currentUserID
        props.client.getPlaylists(prependUserID).then((response) => {setPlaylists(response)})
      }, [])

    // useEffect(() => {
    //   props.client.getPlaylists(window.localStorage.currentUserID).then((response) => setPlaylists(response))
    // }, [])

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

    {/* Mapping through user's playlists here */}

    <div className="timelineContainer my-12">
    <Timeline className="userContainer pl-8">
        <div className="timelinePlaylists">
        {playlists ? playlists?.map((playlist) => {
            if (!playlist.privacy)
        return (
        <Timeline.Item>
            <Timeline.Point icon={Calendar} />
            <Timeline.Content>
            <Timeline.Time className="text-5xl">
            Date to be added
            </Timeline.Time>
            <Timeline.Title className="text-3xl py-4">
                {playlist.name}
            </Timeline.Title>
                    <Timeline.Body>
                        <PlaylistCard key={playlist._id} playlist={playlist} client={props.client} />
                    </Timeline.Body>
                </Timeline.Content>
        </Timeline.Item>
              )})
            :
            <>
            </>
            }
        </div>
    </Timeline>
    </div>
    </>
  )
}

export default CommunityPage;