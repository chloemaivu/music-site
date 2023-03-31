import React, { useState, useEffect } from 'react'
import { Card } from "flowbite-react";
import HeartOutline from "../resources/heart_outline.svg"
import Heart from "../resources/heart_filled.svg"

function PlaylistCard(props) {

    const [tracks, setTracks] = useState([])
    const [visibility, setVisibility] = useState("")

    const playlist = props.playlist
    console.log(playlist)

    const trackIDs = playlist.uri.map((trackID => {
        // console.log(trackID.split(":")[2])
        return (trackID.split(":")[2])
    }))

    // pass in multiple 
    const getTracks = async (uri) => {
        const data = await props.client.getTracks(uri)
        // console.log(data.tracks)
        setTracks(data.tracks)
    }

    function msConvert(duration) {
        const seconds = (duration / 1000).toFixed(0);
        const minutes = Math.floor(seconds / 60);
        return minutes + ":" + seconds.slice(0, 2);
    }

    useEffect(() => {
        getTracks(trackIDs);
        console.log(playlist.privacy)
        if (playlist.privacy === undefined) {
            setVisibility("Unknown")
        } else if (playlist.privacy) {
            setVisibility("Private")
        } else {
            setVisibility("Public")
        }
    }, [playlist])

    return (
        <div className="min-w-full w-screen">
            <Card key={playlist._id}>
                <h5 className="mb-3 text-base text-center font-semibold text-gray-900 dark:text-white lg:text-xl">
                    <span>{playlist.name}</span>
                    <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        {visibility}
                    </span>
                    <span>
                        <img src={HeartOutline} />
                    </span>
                    {/* <span>
                        <img src={Heart} />
                    </span> */}
                </h5>
                <p className="text-sm text-center font-normal text-gray-500 dark:text-gray-400">
                    {playlist.description}
                </p>
                <ul className="my-4 space-y-3">
                    {tracks?.map((track, index) => {
                        return (
                            <>
                                <li key={index}>
                                    <div className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
                                        <img className="resultsCard" src={track?.album?.images[0]?.url} style={{ width: "10%" }} alt={track?.name} />
                                        <span className="ml-3 flex-1 whitespace-nowrap">
                                            {track?.name}
                                        </span>
                                        <span className="ml-3 flex-1 justify-endwhitespace-nowrap">
                                            {msConvert(track?.duration_ms)}
                                        </span>
                                    </div>
                                </li>
                            </>
                        )
                    })}
                </ul>
            </Card>
        </div>
    )
}

export default PlaylistCard;