import React, { useState, useEffect } from 'react'
import { Card } from "flowbite-react";
import { v4 as uuidv4 } from 'uuid'

import HeartOutline from "../resources/heart_outline.svg"
import StarOutline from "../resources/star_outline.svg"
import Delete from "../resources/delete_icon.svg"
import Hamburger from "../resources/hamburger_icon.svg"
import LoadingSpinner from './spinner';


function PlaylistCard(props) {

    const [tracks, setTracks] = useState([])
    const [visibility, setVisibility] = useState("")
    const [ownPlaylist, setOwnPlaylist] = useState()
    const playlist = props.playlist

    const trackIDs = playlist?.uri?.map((trackID => {
        // console.log(trackID.split(":")[2])
        return (trackID.split(":")[2])
    }))
    // pass in multiple 
    const getTracks = async (uri) => {
        const data = await props.client.getTracks(uri)
        setTracks(data.tracks)
    }
    console.log(playlist?.uri)
    const removeTrack = async (id, uri) => {
        await props.client.removeTrack(id, uri)
    }

    function msConvert(duration) {
        const seconds = (duration / 1000).toFixed(0);
        const minutes = Math.floor(seconds / 60);
        return minutes + ":" + seconds.slice(0, 2);
    }

    useEffect(() => {
        getTracks(trackIDs);
        // console.log(playlist.privacy)
        if (playlist.privacy === undefined) {
            setVisibility("Unknown")
        } else if (playlist.privacy) {
            setVisibility("Private")
        } else {
            setVisibility("Public")
        }
    }, [playlist])

    const userChecker = (playlistsID) => {
        const currentUser = "USERID::" + window.localStorage.currentUserID
        if (currentUser === playlistsID) {
            setOwnPlaylist(true)
        } else {
            setOwnPlaylist(false)
        }
    }

    useEffect(() => {
        userChecker(playlist.userID)
    }, [])

    ///// MODAL HANDLING ////////////////////////////////////////////////
    function toggleElement(id) {
        let x = document.getElementById(id)
        if (x.style.display === "none") {
            return x.style.display = "block"
        } else {
            return x.style.display = "none"
        }
    }

    function hamburgerHandler(trackname, trackuri) {
        const setModalProps = {
            name: trackname,
            uri: trackuri
        }
        props.modalProps(setModalProps);
        props.visibility(true);
        toggleElement("trackModal")
    }

    ////////////// JSX //////////////////////////////////////////////////////////

    return tracks?.length > 0 ? (
        <>
            <div key={uuidv4()} className="min-w-full w-screen">
                <Card className="playlistDark" key={uuidv4()}>
                    <h5 className="playlistTitle flex flex-row mb-3 text-base text-center font-semibold text-gray-900 dark:text-white">
                        <div className="text-center">
                            <span className="text-white">{playlist.name}</span>
                            <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                                {visibility}
                            </span>
                        </div>
                        <span className="heartIcon justify-content-end">
                            <img className="inline-block" src={StarOutline} width={35} />
                            <img className="inline-block" src={HeartOutline} width={35} />
                        </span>
                    </h5>
                    <p key={uuidv4()} className="text-sm white-text text-center font-normal dark:text-gray-400">
                        {playlist.description}
                    </p>
                    <ul key={uuidv4()} className="my-4 space-y-3">
                        {tracks?.map(track => {
                            const hamburgerIcon = uuidv4()
                            return (
                                <>
                                    <li key={uuidv4()}>
                                        <div className="playlistBlack border group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                                            onMouseEnter={() => toggleElement(hamburgerIcon)} onMouseLeave={() => toggleElement(hamburgerIcon)}>
                                            <img className="resultsCard" src={track?.album?.images[0]?.url} style={{ width: "10%" }} alt={track?.name} />
                                            <span className="flex-grow-1 ml-3 flex-1 whitespace-nowrap">
                                                {track?.name}
                                            </span>
                                            <span className="flex-grow-0 ml-3 flex-1 text-center whitespace-nowrap">
                                                {msConvert(track?.duration_ms)}
                                            </span>
                                            {ownPlaylist === true ? (
                                                <img src={Delete} width={35} title={"remove track from playlist"} onClick={() => removeTrack(playlist?._id, track?.uri)} />
                                            )
                                                : (<> </>)
                                            }
                                            <img id={hamburgerIcon} src={Hamburger} className="hamburger" style={{ display: "none" }} width={"30px"} onClick={() => hamburgerHandler(track?.name, track?.uri)} />
                                        </div>
                                    </li>
                                </>
                            )
                        })}
                    </ul>
                </Card>
            </div>
        </>
    ) : (<LoadingSpinner key={uuidv4()} />)
}

export default PlaylistCard;