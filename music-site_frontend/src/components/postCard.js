import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlaylistCard from "./playlistCard";
import { Accordion, Avatar, Card, Button, Textarea } from "flowbite-react";

function PostCard(props) {
    const post = props.post;
    const [playlists, setPlaylists] = useState([])

    const [trackLoadState, setTrackLoadState] = useState(false)
    const cardParent = "postCard"

    const getPlaylists = async () => {
        const playlistID = props.playlistID.slice(8, 32)
        await props.client.getPlaylists(playlistID).then((response) => setPlaylists(response[0]))
    }

    useEffect(() => {
        getPlaylists()
    }, [post])

    const userLink = "/profile/" + post.userID.slice(8.32)

    return (
        <Accordion alwaysOpen={true} collapseAll={true} onClick={() => setTrackLoadState(true)}>
            <Accordion.Panel >
                <Accordion.Title >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <a href="profile/user_id">
                                <Link to={userLink} >
                                    <Avatar img={post?.userPicture} rounded={true} />
                                </Link>
                            </a>
                            <a href="">
                                <h2>{post?.username}</h2>
                            </a>
                        </div>
                        <h2 className="white-text text-3xl">{post.playlistName}</h2>
                    </div>
                </Accordion.Title>
                <Accordion.Content>
                    <p className="mb-2 text-gray-500 dark:text-gray-400 text-center">
                        {playlists?.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col items-center justify-center border">
                            <PlaylistCard
                                id={playlists?._id}
                                playlist={playlists}
                                client={props.client}
                                load={trackLoadState}
                                parent={cardParent}
                            />
                        </div>
                        <div>
                            <Card>
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Username said:
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    {post.comments}
                                </p>
                            </Card>
                            {/* Button that pops up the "Create a new comment" form */}
                            <Button
                                className="mt-5"
                                outline={true}
                                gradientDuoTone="cyanToBlue"
                                type="button"
                                size="xl"
                            // onClick={() => toggleComment("commentArea")}
                            >
                                Write a reply
                            </Button>
                            {/* Create a new comment form */}
                            <Card>
                                <div id="commentArea">
                                    <div className="mb-2 block"></div>
                                    <Textarea
                                        id="comment"
                                        placeholder="Leave a comment..."
                                        required={true}
                                        rows={4}
                                    />
                                    <Button
                                        className="mt-5"
                                        outline={true}
                                        gradientDuoTone="cyanToBlue"
                                        type="button"
                                        size="xl"
                                    >
                                        Submit comment
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    );
}

export default PostCard;