import React, { useState, useEffect } from 'react'
import { Card } from "flowbite-react";
import { Button } from 'flowbite-react';
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
        return (trackID.split(":")[2])
    }))

    // pass in multiple 
    const getTracks = async (uri) => {
        const data = await props.client.getTracks(uri)
        setTracks(data.tracks)
    }

    const removeTrack = async (id, uri) => {
        await props.client.removeTrack(id, uri);
        props.update(uuidv4())

    }

    const highlightPlaylist = async () => {
        await props.client.highlightPlaylist(playlist._id).then((response) => console.log(response));
        props.update(uuidv4())
    }

    const deletePlaylist = async () => {
        await props.client.deletePlaylist(playlist._id);
        props.update(uuidv4())
    }

    function msConvert(duration) {
        const seconds = (duration / 1000).toFixed(0);
        const minutes = Math.floor(seconds / 60);
        return minutes + ":" + seconds.slice(0, 2);
    }

    useEffect(() => {
        if (props.parent === "postCard" && props.load === true) {
            getTracks(trackIDs);
        } else if (props.parent === "profile") {
            getTracks(trackIDs)
        }
        if (playlist?.privacy === undefined) {
            setVisibility("Unknown")
        } else if (playlist.privacy) {
            setVisibility("Private")
        } else {
            setVisibility("Public")
        }
    }, [props.load, playlist])

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

    return (
        <>
            <div key={uuidv4()} className="min-w-min w-full">
                <Card className="playlistDark" key={uuidv4()}>
                    <span className="playlistTitle font-bold text-white leading-tight">{playlist?.name}</span>
                    <div style={{ display: "flex", justifyContent: 'space-around', alignItems: "center" }}>
                        <div>
                            <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                                {visibility}
                            </span>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "30px"}}>
                            {props.user?.isAdmin === true && playlist?.privacy === false ? (<>
                                <span className="heartIcon justify-content-end">
                                    <img className="inline-block" src={StarOutline} width={50} title="highlight a playlist" style={{ cursor: "pointer" }} onClick={() => highlightPlaylist()} />
                                </span>
                            </>) : (<></>)}
                            {playlist?.highlighted === true ? (<><p className="grey-text text-4xl"> Featured Playlist! </p></>) : (<></>)}
                        </div>
                    </div>
                    <p key={uuidv4()} className="text-md white-text text-center font-normal dark:text-gray-400">
                        {playlist?.description}
                    </p>
                    {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
                    {tracks?.length > 0 ? (
                        <ul key={uuidv4()} className="my-4 space-y-3">
                            {tracks?.map(track => {
                                const hamburgerIcon = uuidv4()
                                return (
                                    <>
                                        <li key={uuidv4()}>
                                            <div className="playlistBlack border group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                                                onMouseEnter={() => toggleElement(hamburgerIcon)} onMouseLeave={() => toggleElement(hamburgerIcon)}>
                                                <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>

                                                    <div style={{ display: "flex" }}>
                                                        <div>
                                                            <img className="resultsCard" src={track?.album?.images[0]?.url} width={75} alt={track?.name} />
                                                        </div>
                                                        <div>
                                                            <p className="flex-grow-1 ml-3 flex-1 whitespace-nowrap white-text text-xl">
                                                                {track?.name}
                                                            </p>
                                                            <p className="flex-grow-0 ml-3 flex-1 whitespace-nowrap text-xs">
                                                                by <strong>{track?.artists[0]?.name}</strong>
                                                            </p>
                                                            <p className="flex-grow-0 ml-3 flex-1 whitespace-nowrap text-xs">
                                                                from the album <strong>{track?.album.name}</strong>
                                                            </p>
                                                            <p className="flex-grow-0 ml-3 flex-1 whitespace-nowrap text-xs">
                                                                Duration: <strong>{msConvert(track?.duration_ms)}</strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {ownPlaylist === true ? (
                                                            <img src={Delete} width={50} title={"remove track from playlist"} onClick={() => removeTrack(playlist?._id, track?.uri)} />
                                                        )
                                                            : (<> </>)
                                                        }
                                                        <img id={hamburgerIcon} src={Hamburger} className="hamburger" style={{ display: "none" }} width={45} onClick={() => hamburgerHandler(track?.name, track?.uri)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </>
                                )
                            })}
                        </ul>
                    ) : <p className='text-center flex-grow-0 ml-3 flex-1 whitespace-nowrap'><i>This playlist is empty - add some songs!</i></p>}
                    {ownPlaylist === true || props.user?.isAdmin === true ? (<>
                        <Button
                            onClick={() => deletePlaylist()}
                            className="mt-5"
                            outline={true}
                            gradientDuoTone="cyanToBlue"
                            type="button"
                            size="xl"
                            style={{ backgroundColor: "rgb(255,0,0)" }}
                        >
                            DELETE PLAYLIST
                        </Button></>) : (<></>)}
                </Card>
            </div>
        </>
    )
}

export default PlaylistCard;