import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

function SearchResult(props) {

  ////////////////// DATA HANDLING \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  const [searchResult, setResult] = useState({});
  const [dataFilled, setDataFilled] = useState(false);

  const [filter, setFilter] = useState("")
  const [filteredResult, setFilteredResult] = useState([{}]);

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0
  }

  useEffect(() => {
    if (!isEmpty(props.search)) {
      setResult(props.search);
      setDataFilled(true);
    }
  }, [props.search]);

  useEffect(() => {
    if (!isEmpty(searchResult)) {
      const f = searchResult
      if (f.artists) {
        setFilteredResult(f.artists.items);
        setFilter("artists");
      } else if (f.albums) {
        setFilteredResult(f.albums.items);
        setFilter("albums");
      } else if (f.playlists) {
        setFilteredResult(f.playlists.items);
        setFilter("playlists");
      } else {
        setFilteredResult(f.tracks.items);
        setFilter("tracks");
      }
    }
  }, [searchResult])

  const imageSize = 300

  console.log(filteredResult)

  ////////////////// INTERACTION HANDLING \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  const navigate = useNavigate()

  function msConvert(duration) {
    const seconds = (duration / 1000).toFixed(0);
    const minutes = Math.floor(seconds / 60);
    return minutes + ":" + seconds.slice(0, 2);
  }

  function artistHandler(uri) {
    const uriString = uri.slice(15, 37);
    props.artistURI(uriString);
    setTimeout(() => navigate("/artist"), 500);
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

  if (dataFilled === false) {
    return (
      <>
        <br />
        <h2 className="text-5xl text-center"> Use the search bar to find music from spotify...</h2>
        <br />
      </>
    )
  } else if (dataFilled === true && isEmpty(filteredResult) === false) {
    return (
      <>
        <div className="grid grid-cols-5 gap-4">
          {
            filter === "artists" && filteredResult.map(artist => {
              return (
                <>
                  <div className="border">
                    <div key={artist?.data?.uri} >
                      <img className="resultsCard" src={artist?.data?.visuals?.avatarImage?.sources[0]?.url} style={{ width: "100%" }} />
                    </div>
                    <div className="innerText">
                      <p className="cardTitle text-3xl">{artist?.data?.profile?.name}</p>
                      <Button onClick={() => artistHandler(artist?.data?.uri)}> Go to {artist?.data?.profile?.name}'s profile</Button>
                      <Button onClick={() => songHandler(artist?.data?.uri)}> Play {artist?.data?.profile?.name}'s top tracks</Button>
                    </div>
                  </div>
                </>
              )
            })
          }
          {
            filter === "albums" && filteredResult.map(album => {
              return (
                <>
                  <div className="border">
                    <div key={album?.data?.uri}>
                      <img className="resultsCard" src={album?.data?.coverArt?.sources[0]?.url} style={{ width: "100%", height: "100%" }} />
                    </div>
                    <div className="innerText">
                      <p className="cardTitle text-2xl">{album?.data?.name}</p>
                      <p className="text-1xl">{album?.data?.artists?.items[0]?.profile?.name} </p>
                      <Button onClick={() => songHandler(album?.data?.uri)}> Play {album?.data?.name}</Button>
                    </div>
                  </div>
                </>
              )
            })
          }
          {/* {
            filter === "genres" && filteredResult.map(genre => {
              return (
                <>
                  <div className="border">
                    <div key={genre?.data?.uri} className="resultsCard">
                      <img className="resultsCard" src={genre?.data?.image?.sources[0]?.url} style={{ width: "100%" }} />
                    </div>
                    <div className="innerText">
                      <p className="cardTitle text-3xl">{genre?.data?.name}</p>
                    </div>
                  </div>
                </>
              )
            })
          } */}
          {
            filter === "playlists" && filteredResult.map(playlist => {
              return (
                <>
                  <div className="border">
                    <div key={playlist?.data?.uri}>
                      <img className="resultsCard" src={playlist?.data?.images?.items[0]?.sources[0]?.url} style={{ width: "100%", height: "100%" }} />
                    </div>
                    <div className="innerText">
                      <p className="cardTitle text-3xl">{playlist?.data?.name}</p>
                      <Button onClick={() => songHandler(playlist?.data?.uri)}> Play {playlist?.data?.name}</Button>
                    </div>
                  </div>
                </>
              )
            })
          }
          {
            filter === "tracks" && filteredResult.map(track => {
              return (
                <>
                  <div className="border">
                    <div key={track?.data?.uri}>
                      <img className="resultsCard" src={track?.data?.albumOfTrack?.coverArt?.sources[0]?.url} style={{ width: "100%" }} />
                    </div>
                    <div className="innerText">
                      <p className="cardTitle text-3xl">{track?.data?.name}</p>
                      <p className="nameText text-xl">Artist:<strong> {track?.data?.artists?.items[0]?.profile?.name}</strong></p>
                      <p className="nameText text-xl">from album: <strong>{track?.data?.albumOfTrack?.name}</strong></p>
                      <p className="nameText text-xl">Duration: <strong>{msConvert(track?.data?.duration?.totalMilliseconds)}</strong></p>
                      <Button onClick={() => songHandler(track?.data?.uri)}> Play {track?.data?.name}</Button>
                    </div>
                  </div>
                </>
              )
            })
          }          
        </div>
        
      </>
    )
  } else if (dataFilled === true && isEmpty(filteredResult) === true) {
    return (
      <>
        <br />
        <h2 className="text-5xl text-center"> ╮ (. ❛ ᴗ ❛.) ╭  Sorry, nothing to show for that search ( ಥ _ಥ) </h2>
        <br />
        <p className="text-xl text-center"> please try again</p>
        <br />
      </>
    )
  }
}

export default SearchResult;