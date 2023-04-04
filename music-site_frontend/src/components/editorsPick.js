import { useEffect, useState, React } from "react";

function EditorsPick(props) {

    const [playlists, setPlaylists] = useState({})

    const getAllPlaylist = async () => {
        await props.client.getAllPlaylists().then((response) => filterPlaylists(response))
    }

    // only show highlighted playlists
    const filterPlaylists = (playlists) => {
        const filteredPlaylists = playlists?.filter(playlist => playlist.highlighted === true)
        setPlaylists(filteredPlaylists)
    }

    useEffect(() => {
        getAllPlaylist()
    }, [])

    console.log(playlists)

    return (
        <>
            <h2 className="text-5xl text-center">Editor's Picks</h2>
            {/* grid */}
            {playlists.length > 0 ? (<>

                {
                    playlists?.map((playlist, i) => {
                        return (
                            <div key={i}>
                                <h2 className="text-5xl text-center">{playlist.name}</h2>
                                <h2 className="text-5xl text-center">{playlist.description}</h2>
                                <h2 className="text-5xl text-center">Image of first track of playlist</h2>
                            </div>
                        )
                    })
                }

            </>) : (<></>)}


        </>
    )
}

export default EditorsPick;