import React from 'react';
import PlaylistCard from "./playlistCard";
import { Accordion, Avatar, Card, Button, Textarea } from "flowbite-react";

function PostCard(props) {
    const posts = props.posts
    const playlists = props.playlists

    return (
        <Accordion collapseAll={true}>
            <Accordion.Panel>
                {/* Mapping through Posts starts here */}
                <Accordion.Title>
                    <Avatar
                        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        rounded={true}
                    />
                    <h2>User name goes here</h2>
                    <h2>Playlist name goes here</h2>
                </Accordion.Title>
                <Accordion.Content>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        Description of the playlist here.
                    </p>
                    {/* <PlaylistCard key={playlist._id} playlist={playlist} client={props.client} /> */}
                </Accordion.Content>
                {/* Map through all comments connected to the playlist */}
                <Card>
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Comment by user123
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Comment goes here.
                    </p>
                </Card>
                {/* Mapping through comments ends here */}

                {/* Button that pops up the "Create a new comment" form */}
                <Button
                    className="mt-5"
                    outline={true}
                    gradientDuoTone="cyanToBlue"
                    type="button"
                    size="xl"
                // onClick={() => createComment("commentArea")}
                >
                    Write a reply
                </Button>
                {/* Create a new comment form */}
                <Card>
                    <div id="commentArea">
                        <div className="mb-2 block">
                        </div>
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
                            size="xl">
                            Submit comment
                        </Button>
                    </div>
                </Card>
                {/* Mapping through posts ends here */}
            </Accordion.Panel>
        </Accordion>
    )
}

export default PostCard