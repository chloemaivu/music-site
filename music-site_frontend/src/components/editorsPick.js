import { useEffect, useState, React } from "react";

function EditorsPick(props) {

    const [playlists, setPlaylists] = useState({})
    const [tracks, setTracks] = useState([])

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
        console.log(images)
    }

    const getTracks = async (uri) => {
        const data = await props.client.getTracks(uri)
        setTracks(data.tracks)
    }

    useEffect(() => {
        getAllPlaylist()
    }, [])

    console.log(playlists)
    // tracks[i]?.album?.images[0]?.url

    return (
        <>
            <h2 className="text-5xl text-center">Editor's Picks</h2>
            {/* grid */}
            {playlists.length > 0 ? (<>
                <div className="grid grid-cols-5 gap-4" style={{ margin: "1%" }}>
                    {
                        playlists?.map((playlist, i) => {
                            return (
                                <div key={i} className="border">
                                    <div>
                                        <img src="" style={{ width: "100%" }} alt="first track image" />
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

            </>) : (<></>)}


        </>
    )
}

export default EditorsPick;