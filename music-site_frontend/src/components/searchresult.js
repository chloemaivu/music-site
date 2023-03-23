import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, Button } from "flowbite-react";

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
      } else if (f.genres) {
        setFilteredResult(f.genres.items);
        setFilter("genres");
      } else if (f.playlists) {
        setFilteredResult(f.playlists.items);
        setFilter("playlists");
      } else {
        setFilteredResult(f.tracks);
        setFilter("tracks");
      }
    }
  }, [searchResult])

  const imageSize = 400

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

  if (dataFilled === false) {
    return (
      <>
        <br />
        <h2 className="text-5xl text-center"> Use the search bar to find music from spotify...</h2>
        <br />
      </>
    )
  } else if (dataFilled === true) {
    return (
      <>
        {
          filter === "artists" && filteredResult.map(artist => {
            return (
              <Accordion alwaysOpen={true} key={artist?.data?.uri}>
                <Accordion.Panel>
                  <Accordion.Title>
                    {artist?.data?.profile?.name}
                  </Accordion.Title>
                  <Accordion.Content className="white-text">
                    <img src={artist?.data?.visuals?.avatarImage?.sources[0]?.url} width={imageSize} />
                    <Button onClick={() => artistHandler(artist?.data?.uri)}> Go to {artist?.data?.profile?.name}'s profile</Button>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>)
          })
        }
        {
          filter === "albums" && filteredResult.map(album => {
            return (
              <Accordion alwaysOpen={true} key={album?.data?.uri}>
                <Accordion.Panel>
                  <Accordion.Title>
                    {album?.data?.name}
                  </Accordion.Title>
                  <Accordion.Content className="white-text">
                    {album?.data?.artists?.items[0]?.profile?.name}
                    <img src={album?.data?.coverArt?.sources[0]?.url} width={imageSize} />
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>)
          })
        }
        {
          filter === "genres" && filteredResult.map(genre => {
            return (
              <Accordion alwaysOpen={true} key={genre?.data?.uri}>
                <Accordion.Panel>
                  <Accordion.Title>
                    {genre?.data?.name}
                  </Accordion.Title>
                  <Accordion.Content className="white-text">
                    <img src={genre?.data?.image?.sources[0]?.url} width={imageSize} />
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>)
          })
        }
        {
          filter === "playlists" && filteredResult.map(playlist => {
            return (
              <Accordion alwaysOpen={true} key={playlist?.data?.uri}>
                <Accordion.Panel>
                  <Accordion.Title>
                    {playlist?.data?.name}
                  </Accordion.Title>
                  <Accordion.Content className="white-text">
                    <img src={playlist?.data?.images?.items[0]?.sources[0]?.url} width={imageSize} />
                    {playlist?.data?.description}
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>)
          })
        }
        {
          filter === "tracks" && filteredResult.map(track => {
            return (
              <Accordion alwaysOpen={true} key={track?.data?.uri}>
                <Accordion.Panel>
                  <Accordion.Title>
                    {track?.data?.name}
                  </Accordion.Title>
                  <Accordion.Content className="white-text">
                    <h3>Artist name: {track?.data?.artists?.items[0]?.profile?.name}</h3>
                    <h4>From album: {track?.data?.albumOfTrack?.name}</h4>
                    <h5>Duration: {msConvert(track?.data?.duration?.totalMilliseconds)}</h5>
                    <img src={track?.data?.albumOfTrack?.coverArt?.sources[0]?.url} width={imageSize} />
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            )
          })
        }
      </>
    )
  }
}

export default SearchResult;