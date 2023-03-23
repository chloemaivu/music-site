import { React } from "react";
import { useState, useEffect } from "react";
import { Accordion } from "flowbite-react";

function SearchResult(props) {
  const [searchResult, setResult] = useState({});
  const [key, setKey] = useState("");
  const [dataFilled, setDataFilled] = useState(false)

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0
  }

  useEffect(() => {
    console.log(props.search)
    if (!isEmpty(props.search)) {
      setResult(props.search);
      setDataFilled(true);
    }
  }, [props.search]);

  // console.log(dataFilled)
  // console.log(searchResult)

  searchResult.forEach(i = 0, i > i.length, i++) {
    if (searchResult.topResults) {
      const f = searchResult.topResults
      const topResults = ({
        name: "dont",
        artist: "make",
        image: "me",
        uri: "cry"
      });
      return topResults;
    } else if (searchResult.albums) {
      const f = searchResult.albums
      const albumData = ({
        name: f.items[0].data.name,
        artist: f.items[0].data.artists.items[0].profile.name,
        image: f.items[0].data.coverArt.sources[0].url,
        uri: f.items[0].data.uri
      });
      return albumData;
    } else if (searchResult.artists) {
      const f = searchResult.artists
      const artistData = ({
        name: f.data.profile.name,
        image: f.data.visuals.avatarImage.sources[0].url,
        uri: f.data.uri
      });
      return artistData;
    } else if (searchResult.genres) {
      const f = searchResult.genres
      const genreData = ({
        name: f.items[0].data.name,
        image: f.items[0].data.image.sources[0].url,
        uri: f.items[0].data.uri
      });
      return genreData;
    } else if (searchResult.playlists) {
      const f = searchResult.playlists
      const playlistData = ({
        name: f.items[0].data.name,
        image: f.items[0].data.images.items[0].sources.[0].url,
        description: f.items[0].data.description,
        uri: f.items[0].data.uri
      });
      return playlistData;
    } else if (searchResult.track) {
      const f = searchResult.track
      const trackData = ({
        name: f.items[0].data.name,
        artist: f.items[0].data.artists[0].profile.name,
        album: f.items[0].data.albumOfTrack.name,
        coverArt: f.items[0].data.albumOfTrack.coverArt.sources[0].url,
        duration: f.items[0].data.duration.totalMilliseconds,
        uri: f.items[0].data.uri
      });
      return trackData;
    }
  }

  useEffect(() => {
    if (!isEmpty(searchResult)) {
      console.log(filteredResult.find(
        findAlbum(name) {
        return name = filteredResult.data.name
      }))
    }
  }, [filteredResult])

  useEffect(() => {
    const filteredAlbum = ({
      name: filteredResult[0].data.name,
      artist: filteredResult[0].data.artists.items[0].profile.name,
      image: filteredResult[0].data.coverArt.sources[0].url,
      uri: filteredResult[0].data.uri
    })
  }, [filteredResult])  

  const renderedResult = searchResult.map((result) => {
    return (
  <Accordion alwaysOpen={true}>
    <Accordion.Panel>
      <Accordion.Title>{resultFilter}</Accordion.Title>
      <Accordion.Content>
        <p className="text-gray-500 dark:text-gray-400">
          Expands to reveal more information.
        </p>
      </Accordion.Content>
    </Accordion.Panel>
  </Accordion>
    );
  })

  // const renderedResults = searchResult.map((result) => {  
  //   // gets the key as a string
  //   const key = Object.keys(searchResult)[1]

  //   if (dataFilled === false) {
  //     return (
  //       <>
  //         <br />
  //         <h2 className="text-5xl text-center"> Use the search bar to find music from spotify...</h2>
  //         <br />
  //       </>
  //     )
  //   } else {
  //     return (
  //       <Accordion alwaysOpen={true}>
  //         <Accordion.Panel>
  //           <Accordion.Title>{searchResult[key].items[0].data.profile.name}</Accordion.Title>
  //           <Accordion.Content>
  //             <p className="text-gray-500 dark:text-gray-400">
  //               {searchResult[key].items[0].data.profile.name}
  //             </p>
  //             <img src={searchResult[key].items[0].data.visuals.avatarImage.sources[0].url}
  //               width={imageSize} />
  //           </Accordion.Content>
  //         </Accordion.Panel>
  //       </Accordion>
  //     )
  //   }

  // })

  const imageSize = 400

  if (dataFilled === false) {
    return (
      <>
        <br />
        <h2 className="text-5xl text-center"> Use the search bar to find music from spotify...</h2>
        <br />
      </>
    )
  } else {
    return (
      <Accordion alwaysOpen={true}>
        <Accordion.Panel>
          <Accordion.Title>{searchResult[key].items[0].data.profile.name}</Accordion.Title>
          <Accordion.Content>
            <p className="text-gray-500 dark:text-gray-400">
              {searchResult[key].items[0].data.profile.name}
            </p>
            <img src={searchResult[key].items[0].data.visuals.avatarImage.sources[0].url}
              width={imageSize} />
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    )
  }
}

export default SearchResult;

{/* {renderedResult} */ }
// {searchResult.artists.item[0].data.profile.name}


/* /////////// DESIRED DATA \\\\\\\\\\\
ALBUMS [album name, artists name, image, uri]
ARTISTS [artists name, image, uri ]
GENRES [name, image, uri]
PLAYLISTS [name, image, description, uri]
TRACKS [name, artist, album, album art, duration, uri]
MULTI [ >:( ]
*/

{/* <p className="text-5xl"> {searchResult.artists.items[0].data.profile.name}</p>
<p className="text-5xl"> {searchResult.artists.items[0].data.uri}</p>
<img src={searchResult.artists.items[0].data.visuals.avatarImage.sources[0].url}
  width={imageSize} /> */}
