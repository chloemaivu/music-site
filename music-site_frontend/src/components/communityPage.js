import { React, useState, useEffect } from 'react';
import { Timeline, Avatar, Badge } from "flowbite-react";
import { CalendarIcon } from "@heroicons/react/24/solid";
// import PlaylistCard from "./playlistCard";
import PostCard from "./postCard";
import { v4 as uuidv4 } from "uuid";

function CommunityPage(props) {
    const user = props.user
    const [playlists, setPlaylists] = useState([])
    const [posts, setPosts] = useState([])


    const getAllPlaylist = async () => {
        await props.client.getAllPlaylists().then((response) => setPlaylists(response))
    }

    const getAllPosts = async () => {
        await props.client.getAllPosts().then((response) => {
            setPosts(response)
        })
    }

    useEffect(() => {
        getAllPlaylist()
    }, [])

    useEffect(() => {
        getAllPosts()
    }, [])

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
                            <h6 className="uppercase">admin :lock:</h6>
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
                        {/* {playlists ? playlists?.map((playlist, i) => {
                            // getUserInfo(playlist.userID)
                            const uniqueKey = uuidv4()
                            if (!playlist.privacy)
                                return ( */}
                        <Timeline.Item
                        // key={i}
                        >
                            <Timeline.Point icon={Calendar} />
                            <Timeline.Content>
                                <PostCard posts={posts} playlists={playlists}/>
                            </Timeline.Content>
                        </Timeline.Item>
                        {/* )
                        })
                            :
                            <>
                            </>
                        } */}
                    </div>
                </Timeline>
            </div>
        </>
    )
}
export default CommunityPage;