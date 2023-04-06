import { useEffect, useState, React } from "react";

import LoadingSpinner from "./spinner";
import PlaylistCard from "./playlistCard";
import TrackOptions from "./modalTrackOptions";

function EditorsPick(props) {

    const [playlists, setPlaylists] = useState([])
    const [tracks, setTracks] = useState([])
    const [index, setIndex] = useState(-1)
    const [updater, setUpdater] = useState()

    const getAllPlaylist = async () => {
        await props.client.getAllPlaylists().then((response) => filterPlaylists(response))
    }

    // only show highlighted playlists
    const filterPlaylists = (playlists) => {
        const filteredPlaylists = playlists?.filter(playlist => playlist.highlighted === true)
        setPlaylists(filteredPlaylists)

        const images = []
        filteredPlaylists.map(playlist =>
            images.push(playlist.uri[0].split(":")[2]))
        getTracks(images)
    }

    // get tracks to get image of first track
    const getTracks = async (uri) => {
        const data = await props.client.getTracks(uri)
        setTracks(data.tracks)
    }

    useEffect(() => {
        getAllPlaylist()
    }, [updater])

    console.log(playlists)

    function revealPlaylist(i) {
        // change index of playlists to be shown
        // automatically reveal full playlist when clicked
        if (index === i) {
            // can toggle to hide full playlist
            setIndex(-1)
        } else {
            setIndex(i)
        }
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

    const [modalVisibility, setModalVisibility] = useState(false)
    const [modalProps, setModalProps] = useState({
        name: "",
        uri: ""
    })

    function createModalProps(name, uri) {
        setModalProps({
            name: name,
            uri: uri
        })
    }

    function toggleModal(id) {
        let x = document.getElementById(id)
        if (x.style.display === "none") {
            return x.style.display = "block"
        } else {
            return x.style.display = "none"
        }
    }

    function hamburgerHandler(name, uri) {
        setModalVisibility(true);
        createModalProps(name, uri);
        toggleModal("trackModal")
    }

    useEffect(() => {
        if (modalVisibility === true) {
            toggleModal("trackModal")
        }
    }, [modalVisibility])


    return (
        <>
            {playlists?.length > 0 && tracks?.length > 0 ? (
                <>
                    <h2 className="text-5xl text-center">Editor's Picks</h2>
                    <br />
                    <div className="grid grid-cols-5 gap-4" style={{ margin: "1%" }}>
                        {
                            playlists?.map((playlist, i) => {
                                return (
                                    <div key={i} className="border" onClick={() => revealPlaylist(i)} style={{ cursor: "pointer" }}>
                                        <div>
                                            <img src={tracks[i]?.album?.images[0]?.url} style={{ width: "100%" }} alt="first track image" />
                                        </div>
                                        <div className="text-center" >
                                            <p className="text-3xl"><strong>{playlist.name}</strong></p>
                                            <p className="text-xl">{playlist.description}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* update playlist in playlist card */}
                    {index >= 0 ?
                        <PlaylistCard
                            id={playlists[index]._id}
                            modalProps={(modalProps) => setModalProps(modalProps)}
                            playlist={playlists[index]}
                            client={props.client}
                            parent={"profile"}
                            user={props.user}
                            visibility={(modalVisibility) => setModalVisibility(modalVisibility)}
                            update={(updater) => setUpdater(updater)}/>
                        : <></>}
                </>) : (<>
                    <LoadingSpinner />
                </>)}
            <TrackOptions
                client={props.client}
                name={modalProps.name}
                songURI={(songURI) => setSongURI(songURI)}
                type={(type) => setType(type)}
                uri={modalProps.uri}
                visiblity={modalVisibility} />
        </>
    )
}

export default EditorsPick;