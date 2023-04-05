import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlaylistCard from "./playlistCard";
import { Accordion, Avatar, Card, Button, Textarea } from "flowbite-react";

function PostCard(props) {
    const post = props.post;
    const loggedInUser = props.username;
    const [playlists, setPlaylists] = useState([])

    const [trackLoadState, setTrackLoadState] = useState(false)
    const cardParent = "postCard"
    const [comment, setComment] = useState([])

    const getPlaylists = async () => {
        const playlistID = props.playlistID.slice(8, 32)
        await props.client.getPlaylists(playlistID).then((response) => setPlaylists(response[0]))
    }

    const toggleComment = () => {
        let replyCard = document.getElementById("replyArea")
        let commentsCard = document.getElementById("commentArea")
            if (replyCard.style.display === "none") {
                replyCard.style.display = "flex"
                commentsCard.style.display = "none"
            } else {
                replyCard.style.display = "none"
                commentsCard.style.display = "flex"
            }}

            async function submitHandler(e) {
                e.preventDefault()
                props.client.postComment(
                    post._id,
                    loggedInUser,
                    e.target.comment.value)
                    .then((response) => {
                        setComment(response)
                        alert("Comment submited successfully!")
                        console.log(response)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }

console.log(post._id)
console.log(loggedInUser)

    useEffect(() => {
        getPlaylists()
    }, [post])

    const userLink = "/profile/" + post.userID.slice(8.32)

    return (
        <Accordion alwaysOpen={true} collapseAll={true} onClick={() => setTrackLoadState(true)} alwaysOpen={true} className="accordionElement">
            <Accordion.Panel >
                <Accordion.Title >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <a className="inline-block mx-2" href="profile/user_id">
                                <Link to={userLink} >
                                    <Avatar width={100} img={post?.userPicture} rounded={true}/>
                                </Link>
                            </a>
                            <a href="" className="inline-block mx-2 text-2xl">
                                <h2>{post?.username}</h2>
                            </a>
                        </div>
                        <h2 className="white-text text-3xl">{post.playlistName}</h2>
                    </div>
                </Accordion.Title>
                <Accordion.Content>
                    <p className="m-5 text-2xl text-gray-500 dark:text-gray-400 text-center">
                        {playlists?.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col items-center justify-center">
                            {/* <div className="flex-wrap"> */}
                            <PlaylistCard
                                id={playlists?._id}
                                playlist={playlists}
                                client={props.client}
                                load={trackLoadState}
                                parent={cardParent}
                            />
                            {/* </div> */}
                        </div>
                        <div>
                            <Card id="commentArea">
                                <h5 className="text-lg font-bold tracking-tight text-gray-400 dark:text-white">
                                    Username said:
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    {post.comments}
                                </p>
                            </Card>
                            {/* Button that pops up the "Create a new comment" form */}
                            <Button
                                className="postBtn mt-5"
                                outline={true}
                                gradientDuoTone="cyanToBlue"
                                type="button"
                                size="lg"
                                onClick={toggleComment}
                            >
                                Write a reply
                            </Button>
                            {/* Create a new comment form */}
                            <Card id="replyArea">
                                <form
                                className="mb-2 block"
                                onSubmit={(e) => submitHandler(e)}
                                >
                                    <Textarea
                                        className="text-black"
                                        id="comment"
                                        name="comment"
                                        placeholder="Leave a comment..."
                                        required={true}
                                        rows={4}
                                    />
                                    <Button
                                        className="postBtn mt-5"
                                        outline={true}
                                        gradientDuoTone="cyanToBlue"
                                        type="submit"
                                        size="lg"
                                    >
                                        Submit comment
                                    </Button>
                                </form>
                            </Card>
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    );
}

export default PostCard;