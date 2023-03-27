import SpotifyPlayer from "react-spotify-web-playback"

function SpotifyWidget(props) {

  let songURI = props.songURI
  let type = props.type

  if (songURI.length == 0 ) {
    songURI = window.localStorage.getItem("spotifyURI")
    type = window.localStorage.getItem("filter");
  }

  // const bandcampURI = "588442304"
  return (
    <>
      {/* <iframe
        style={{ border: 0, width: "100%", height: 120 }}
        src={`https://bandcamp.com/EmbeddedPlayer/track=${bandcampURI}/size=large/bgcol=181a1b/linkcol=056cc4/tracklist=false/artwork=small/transparent=true/`}
        seamless=""
      >
        &lt;a href="https://lorn.bandcamp.com/track/entropyyy"&gt;ENTROPYYY by
        LORN&lt;/a&gt;
      </iframe> */}

      <iframe
        style={{ borderRadius: 12 }}
        src={`https://open.spotify.com/embed/${type}/${songURI}?utm_source=generator`}
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        width="100%"
        height={250}
      />
    </>

  )
}

export default SpotifyWidget;

{/* <iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/track=588442304/size=large/bgcol=181a1b/linkcol=056cc4/tracklist=false/artwork=small/transparent=true/" seamless><a href="https://mountainscrave.bandcamp.com/track/i-en-hall-med-flesk-og-mj-d-darkthrone-cover">I en Hall Med Flesk Og Mjød (Darkthrone cover) by Mountains Crave</a></iframe> */ }
