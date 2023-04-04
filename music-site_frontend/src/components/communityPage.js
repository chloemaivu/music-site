import { React, useState, useEffect } from 'react';
import { Timeline, Avatar, Badge } from "flowbite-react";
import { CalendarIcon } from "@heroicons/react/24/solid";

import PostCard from "./postCard";
import { v4 as uuidv4 } from "uuid";

function CommunityPage(props) {
    const user = props.user
    const [posts, setPosts] = useState([])


    const getAllPosts = async () => {
        await props.client.getAllPosts().then((response) => {
            setPosts(response)
        })
    }

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
            <div className="timelineContainer my-12">
                <Timeline className="userContainer pl-8">
                    <div className="timelinePlaylists">
                        {posts ? posts?.map((post) => {
                            return (
                                <Timeline.Item key={uuidv4()}>
                                    <Timeline.Point icon={Calendar} />
                                    <Timeline.Content>
                                        <Timeline.Time className="text-5xl">
                                            {post.updatedAt.slice(0, 10)} {post.updatedAt.slice(11, 16)}
                                        </Timeline.Time>
                                        <Timeline.Body>
                                            <PostCard
                                                playlistID={post.playlistID}
                                                post={post}
                                                client={props.client} />
                                        </Timeline.Body>
                                    </Timeline.Content>
                                </Timeline.Item>
                            )
                        }) : <h1>Sorry, no posts here yet.</h1>}
                    </div>
                </Timeline>
            </div>
        </>
    )
}
export default CommunityPage;