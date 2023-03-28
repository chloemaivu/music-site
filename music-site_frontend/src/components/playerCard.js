import { React, useEffect, useState } from 'react';
import SpotifyWidget from "./spotifyPlayer";

function SidebarPlayer(props) {
  const songURI = props.songURI
  const type = props.type

  const [trackLyrics, setTrackLyrics] = useState([])

  const getLyrics = async (uri) => {
    if (songURI) {
      const data = await props.client.getLyrics(uri);
      setTrackLyrics(data.lyrics.lines)
    }
  }

  useEffect(() => {
    getLyrics(songURI)
  }, [songURI])

  return (
    <>
      <div id="sidebar" className="border" style={{ display: "block" }}>
        {window.localStorage.spotifyURI && window.localStorage.filter ? (
          <>
            <div className="p-4">
              <SpotifyWidget type={type} songURI={songURI} />
            </div>
            <div className="p-4 white-text">
              {type === "track" ? (
                <>
                  <u className="lyricsHeader">Lyrics:</u>
                  {
                    trackLyrics.map(line => {
                      return (
                        <div>
                          {line.words}
                        </div>
                      )
                    })
                  }
                </>) : (<>
                </>)}
            </div>
          </>
        ) : (
          <>
            <br />
            <p className="grey-text center text-xl"> Use the search function to look for music you like. When you find something good, you can queue it up to play here!</p>
            <br />
          </>
        )
        }

      </div>


    </>
  )
}

export default SidebarPlayer;