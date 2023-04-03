import { React, useState, useEffect } from 'react';
import { Timeline, Avatar, Badge } from "flowbite-react";
import { CalendarIcon } from "@heroicons/react/24/solid";
import PlaylistCard from "./playlistCard";
import { v4 as uuidv4} from "uuid"

function CommunityPage(props) {
    const user = props.user
    const [playlists, setPlaylists] = useState([])
    const [usersData, setUsersData] = useState({})
    const [playlistUsersInfo, setPlaylistsUsersInfo] = useState([])

    useEffect(() => {
        getAllPlaylist()
    }, [])

    const getAllPlaylist = async () => {
        await props.client.getAllPlaylists().then((response) => setPlaylists(response))
    }

    /// still needs work
    // const getUserInfo = async (id) => {
    //     const userID = id.slice(8, 32)
    //     const usersResponse = await props.client.getUserData(userID)
    //     setUsersData(usersResponse)
    // }

    // /// still needs work`
    // const extractUsersData = () => {
    //     const playlistUsersInfo = []
    //     const userData = [usersData]
    //     userData.map(user => {
    //         playlistUsersInfo.push({
    //             name: user.username,
    //             picture: user.picture
    //         })
    //     })
    //     setPlaylistsUsersInfo(playlistUsersInfo)
    // }

    // /// still needs work
    // useEffect(() => {
    //     async function get(){
    //         getUserInfo()
    //     }
    //     get();
    //     extractUsersData()     
    // }, [])

    console.log(playlistUsersInfo)

    function Calendar() {
        return (
            <div>
                <CalendarIcon className="h-6 w-6" />
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-row items-center justify-center">
                <Avatar className="rounded-2xl"
                    img={user.picture}
                    rounded={true} />
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
                        {playlists ? playlists?.map((playlist, i) => {
                            // getUserInfo(playlist.userID)
                            const uniqueKey = uuidv4()
                            if (!playlist.privacy)
                                return (
                                    <Timeline.Item key={i}>
                                        <Timeline.Point icon={Calendar} />
                                        <Timeline.Content>
                                            <Timeline.Time className="text-5xl">
                                                {playlist.updatedAt.slice(0, 10)} {playlist.updatedAt.slice(11, 16)}
                                            </Timeline.Time>
                                            <Timeline.Title className="text-3xl py-4">
                                                <img key={uniqueKey} src={usersData?.picture} rounded={true} width={100} />
                                                {playlist.username}'s playlist
                                            </Timeline.Title>
                                            <Timeline.Body>
                                                <PlaylistCard key={playlist._id} playlist={playlist} client={props.client} />
                                            </Timeline.Body>
                                        </Timeline.Content>
                                    </Timeline.Item>
                                )
                        })
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