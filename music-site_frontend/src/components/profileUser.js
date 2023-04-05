import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Card, Button, Badge } from "flowbite-react";

import CreatePlaylistModal from "./modalCreatePlaylist";
import TrackOptions from './modalTrackOptions';
import PlaylistCard from "./playlistCard";

function UserProfile(props) {
    const { userid } = useParams()

    const [user, setUser] = useState({})
    const [playlists, setPlaylists] = useState({})
    const [bioState, setBioState] = useState(true)
    const [bio, setBio] = useState("")
    const playlistParent = "profile"

    console.log(user)

    useEffect(() => {
        props.client.getUserData(userid).then((response) => setUser(response.data))
    }, [])

    useEffect(() => {
        const prependUserID = "USERID::" + userid
        props.client.getPlaylists(prependUserID).then((response) => { setPlaylists(response) })
    }, [user])

    useEffect(() => {
        if (user?.bio?.length === 0) {
            setBioState(false)
        }
    }, [user])

    const onClick = (id) => {
        let x = document.getElementById(id)
        if (x.style.display === "none") {
            x.style.display = "block"
        } else {
            x.style.display = "none"
        }
    }

    async function bioHandler(e) {
        e.preventDefault()
        props.client.setBio(
            window.localStorage.currentUserID,
            e.target.bio.value
        ).then((response) => setBio(response));
        setBioState(true);
    }

    ////// PARENT PROPS PASS HANDLING ////////////////////////////////////////////
    const [songURI, setSongURI] = useState("")
    const [type, setType] = useState("")

    useEffect(() => {
        props.songURI(songURI)
    }, [songURI])

    useEffect(() => {
        props.type(type)
    }, [type])

    ///// MODAL HANDLING ////////////////////////////////////////////////

    const [modalProps, setModalProps] = useState({
        name: "",
        uri: ""
    })
    const [modalVisibility, setModalVisibility] = useState(false)

    function toggleElement(id) {
        let x = document.getElementById(id)
        if (x.style.display === "none") {
            return x.style.display = "block"
        } else if (x.style.display === "block") {
            return x.style.display = "none"
        }
    }

    useEffect(() => {
        if (modalVisibility === true) {
            toggleElement("trackModal")
        }
    }, [modalVisibility])

    return (
        <>
            {/* ///////////// USER CARD ///////////////////////////////////////////// */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                <div className="max-w-sm">
                    <Card className="background-grey">
                        <div className="flex flex-col items-center pb-10">
                            <img
                                className="userImage mb-3 rounded-full shadow-lg"
                                src={user.picture}
                                alt="User image"
                            />
                            <div className="flex flex-row">
                                <h2 className="flex-col mb-1 text-2xl font-medium dark:text-white p-2">
                                    {user.username}
                                </h2>
                                <div className="flex-col mb-1 text-2xl font-medium dark:text-white p-2">
                                    {(user.isAdmin === true) ? (
                                        <Badge
                                            size="sm"
                                            className="adminBadge">
                                            <h6 className="uppercase">admin 🔒</h6>
                                        </Badge>
                                    ) : (<></>)}
                                </div>
                            </div>
                            <h5 className="text-sm dark:text-gray-400 p-2">
                                {user.email}
                            </h5>
                            <h5 className="mb-1 text-xl font-medium dark:text-white p-2">
                                Member since: {user?.createdAt?.slice(0, 10)}
                            </h5>
                            <br />
                            {props.currentUser.isAdmin === true ? (<><p><strong>User ID:</strong> {userid}</p></>):(<></>) } 
                            <br />
                            {/* /////////////////////////// USER BIO /////////////////////// */}
                            <div className="mt-4 flex space-x-3 lg:mt-6">
                                {bioState === true ? (
                                    <>
                                        <div>
                                            <p id="userBio" className="grey-text borderGrey text-justify p-4">{user?.bio}</p>
                                        </div>

                                    </>) : (
                                    <>
                                        <div className="text-center">
                                            <p> ╮ (. ❛ ᴗ ❛.) ╭ </p>
                                            <p> This user hasn't set a bio</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* //////////// PLAYLISTS ////////////////////////////////////////////// */}
                <TrackOptions
                    client={props.client}
                    name={modalProps.name}
                    songURI={(songURI) => setSongURI(songURI)}
                    type={(type) => setType(type)}
                    uri={modalProps.uri}
                    visiblity={modalVisibility} />
                <div className="playlistsArea">
                    <h1 className="artistHeading text-center py-3">{user?.username}'s Playlists</h1>
                    {playlists?.length > 0 ?
                        playlists?.map((playlist) => {
                            return (
                                <PlaylistCard
                                    client={props.client}
                                    key={playlist._id}
                                    parent={playlistParent}
                                    playlist={playlist}
                                    modalProps={(modalProps) => setModalProps(modalProps)}
                                    visibility={(modalVisibility) => setModalVisibility(modalVisibility)} />
                            )
                        })
                        : <></>}
                </div>
            </div>

        </>
    )
}

export default UserProfile;