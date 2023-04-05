import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlaylistCard from "./playlistCard";
import { Accordion, Avatar, Card, Button, Textarea } from "flowbite-react";
import { v4 as uuidv4 } from "uuid";

function PostCard(props) {
    const post = props.post;
    const loggedInUser = props.username;
    const [playlists, setPlaylists] = useState([])

    const [trackLoadState, setTrackLoadState] = useState(false)
    const cardParent = "postCard"
    const [comment, setComment] = useState([])
    const replyID = uuidv4()
    const commentID = uuidv4()
    const replyBtnID = uuidv4()

    const getPlaylists = async () => {
        const playlistID = props.playlistID.slice(8, 32)
        await props.client.getPlaylists(playlistID).then((response) => setPlaylists(response[0]))
    }

    const toggleComment = () => {
        let replyCard = document.getElementById(replyID)
        let commentsCard = document.getElementById(commentID)
        let replyButton = document.getElementById(replyBtnID)
            if (replyCard.style.display === "none") {
                replyCard.style.display = "flex"
                replyButton.style.display = "none"
                commentsCard.style.display = "none"
            } else {
                replyCard.style.display = "none"
                commentsCard.style.display = "flex"
                replyButton.style.display = "flex"
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
                        {post.comments ? post?.comments?.map((posts, index) => {
                            return (
                                <>
                            <Card id={commentID}
                            className="commentArea"
                            key={index}
                            >
                                <h5 className="text-lg font-bold tracking-tight text-gray-400 dark:text-white">
                                {posts?.split(":")[0]}
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    {posts?.split(":")[1]}
                                </p>
                            </Card>
                            </>
                            )
                        }) : <h1>No comments here yet.</h1>}
                        <div className="flex justify-center mb-4">
                        <Button
                                id={replyBtnID}
                                className="postBtn mt-5 object-center"
                                outline={true}
                                gradientDuoTone="cyanToBlue"
                                type="button"
                                size="lg"
                                onClick={() => toggleComment()}
                            >
                                Write a reply
                        </Button>
                        </div>
                        <Card id={replyID} key={replyID} className="replyArea hidden">
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
                                    <div className="flex justify-center">
                                        <Button
                                            className="postBtn"
                                            outline={true}
                                            gradientDuoTone="cyanToBlue"
                                            type="submit"
                                            size="lg"
                                        >
                                            Submit comment
                                        </Button>
                                    </div>
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