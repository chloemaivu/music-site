function SpotifyWidget(props) {

  let songURI = props.songURI
  let type = props.type

  if (songURI.length === 0) {
    songURI = window.localStorage.getItem("spotifyURI")
    type = window.localStorage.getItem("filter");
  }

  return (
    <>
      <iframe title="player"
        style={{ borderRadius: 12 }}
        src={`https://open.spotify.com/embed/${type}/${songURI}?utm_source=generator`}
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        width="100%"
        height={400}
      />


    </>

  )
}

export default SpotifyWidget;
