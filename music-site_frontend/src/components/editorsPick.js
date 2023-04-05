import { useEffect, useState, React } from "react";
import LoadingSpinner from "./spinner";
import PlaylistCard from "./playlistCard";

function EditorsPick(props) {

    const [playlists, setPlaylists] = useState([])
    const [tracks, setTracks] = useState([])
    const [index, setIndex] = useState(-1)

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
    }, [])

    console.log(playlists)

    function revealPlaylist(i) {
        //change index of playlists to be shown
        // automatically reveal full playlist when clicked
        if (index === i) {
            // can toggle to hide full playlist
            setIndex(-1)
        } else {
            setIndex(i)
        }

    }

    return (
        <>
            {playlists?.length > 0 && tracks?.length > 0 ? (
                <>
                    <h2 className="text-5xl text-center">Editor's Picks</h2>
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
                            playlist={playlists[index]}
                            client={props.client}
                            parent={"profile"}
                        />
                        : <></>}
                </>) : (<>
                    <LoadingSpinner />
                </>)}
        </>
    )
}

export default EditorsPick;