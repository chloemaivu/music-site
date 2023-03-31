import { useEffect, useState } from "react"
import { Button } from "flowbite-react"
import QRCode from "react-qr-code";

import Closer from "../resources/close-x_icon.svg"

function TrackOptions(props) {
    const uri = props.uri

    const [userPlaylists, setUserPlaylists] = useState([])

    useEffect(() => {
        console.log(props.visiblity)
        if (props.visiblity === true) {
            toggleModal("trackModal")            
        } 
    }, [])

    useEffect(() => {
        async function getPlaylists(id) {
            await props.client.getPlaylists(id).then((response) => setUserPlaylists(response));
        }
        const prependUserID = "USERID::" + window.localStorage.currentUserID
        getPlaylists(prependUserID)
    }, [window.localStorage.userPlaylists])

    // useEffect(() => {
    //     console.log(window.localStorage.userPlaylists)
    //     setUserPlaylists(window.localStorage.userPlaylists)
    // }, [window.localStorage.userPlaylists])

    function toggleModal(id) {
        let x = document.getElementById(id)
        if (x.style.display === "none") {
            return x.style.display = "block"
        } else {
            return x.style.display = "none"
        }
    }

    const addHandler = async (id, uri) => {
        await props.client.appendPlaylist(id, uri)
        toggleModal("trackModal")
    }

    function songHandler(uri) {
        console.log(uri)
        const splitURI = uri.split(":")
        // pass in type and songURI as props to homepage and then to player card
        props.type(splitURI[1]);
        props.songURI(splitURI[2]);

        window.localStorage.setItem("filter", splitURI[1]);
        window.localStorage.setItem("spotifyURI", splitURI[2])
    }

    return (
        <div id="trackModal" className="trackModal border" style={{ display: "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="white-text text-4xl">{props.name}</p>
                <img className="hamburger" src={Closer} onClick={() => toggleModal("trackModal")} width="30px" />
            </div>
            <hr />
            <p className="white-text pb-4 text-xl"> add track to playlist : </p>
            {userPlaylists?.map((playlist, i) => {
                return (
                    <div key={i} onClick={() => addHandler(playlist._id, uri)}>
                        <p className="white-text pl-8 py-1 playlistItem" key={i}>{playlist?.name}</p>
                    </div>
                )
            })
            }
            <div className="playlistItem" onClick={() => toggleModal("createPlaylistModal")}>
                <p className="grey-text">CREATE NEW PLAYLIST</p>
            </div>
            <hr />
            <br />
            <div className="playlistItem" onClick={() => songHandler(uri)}>
                <p className="white-text text-xl">Play track {props.name} in player</p>
            </div>
            <br />
            <hr className="pt-4" />
            <p className="white-text text-xl"> {props.name} on Spotify </p>
            <div className="p-4">
                <QRCode
                    className="border rounded-lg"
                    bgColor="#a2c4bd"
                    fgColor="#222222"
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    title={uri}
                    value={uri}
                    viewBox={`0 0 256 256`}
                />
            </div>
        </div>
    )
}

export default TrackOptions