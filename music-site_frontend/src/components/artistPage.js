import { React, useEffect, useState } from 'react';
import { Carousel, Table } from "flowbite-react";
import { useParams } from 'react-router-dom';
import { v4 as uudiv4 } from "uuid"

import LoadingSpinner from './spinner';
import Hamburger from "../resources/hamburger_icon.svg"
import TrackOptions from './modalTrackOptions';

function ArtistPage(props) {
    const { artistId } = useParams()

    const [albumInfo, setAlbumInfo] = useState([])
    const [albumMapped, setAlbumMapped] = useState([])

    const [apiAlbums, setApiAlbums] = useState([])

    const [artistAlbum, setArtistAlbum] = useState([])
    const [artistImages, setArtistImages] = useState([])
    const [artistInfoFilled, setArtistInfoFilled] = useState(false)
    const [artistInfo, setArtistInfo] = useState({})
    const [artistSocials, setArtistSocials] = useState([])

    const [bio, setBio] = useState("")

    const albumIDs = []

    const getArtistInfo = async (uri) => {
        const data = await props.client.getArtist(uri);

        setAlbumMapped(data.artist.discography.albums.items)
        setArtistAlbum(data.artist.discography.albums.items)
        setArtistImages(data.artist.visuals.gallery.items)
        setArtistInfo(data)
        setArtistSocials(data.artist.profile.externalLinks.items)
        setBio(data.artist.profile.biography.text)
    }

    const extractAlbumIDs = () => {
        albumMapped.map(albumId => albumIDs.push(albumId.releases?.items[0]?.id)
        )
    }

    useEffect(() => {
        async function fetchData() {
            await getArtistInfo(artistId);
            setArtistInfoFilled(true)
        }
        fetchData()
    }, [artistId])

    useEffect(() => {
        extractAlbumIDs()
    }, [artistInfo])

    // get discography albums info
    useEffect(() => {
        async function fetchAlbums() {
            const data = await props.client.getAlbums(albumIDs)
            setApiAlbums(data.albums)
        }
        fetchAlbums()
    }, [albumIDs])

    useEffect(() => {
        const albumArrays = []
        const albumsData = []

        apiAlbums.map(albumData => albumArrays.push(albumData.tracks.items))
        // console.log(albumArrays)
        albumArrays.map(album => {
            const albums = []
            const tracks = (album.map(item => (
                [item.name,item.uri]
            )))
            albums.push(tracks);
            albumsData.push(albums)
        })
        setAlbumInfo(albumsData)
    }, [apiAlbums])

    function createMarkup(html) {
        return {
            __html: html
        }
    }

    function toggleModal(id) {
        let x = document.getElementById(id)
        if (x.style.display === "none") {
            return x.style.display = "block"
        } else {
            return x.style.display = "none"
        }
    }

    ////////////////////////////////////////////////////////////////////

    if (artistInfoFilled === false && albumInfo.length == 0) {
        return (
            <LoadingSpinner />
        )
    } else if (artistInfoFilled === true && albumInfo.length > 0) {
        const div = uudiv4()
        return (
            <div key={div}>
                <div className="flex flex-col items-center justify-center border"
                    style={{ margin: "1%", background: `linear-gradient(45deg,${artistInfo?.artist?.visuals?.headerImage?.extractedColors?.colorRaw?.hex},${artistInfo?.artist?.visuals?.avatarImage?.extractedColors?.colorRaw?.hex}` }}
                >
                    <div className="flex-row">
                        <h1 className="artistTitle text-center py-5">{artistInfo?.artist?.profile?.name}</h1>
                    </div>
                    {/* Carousel for artist gallery */}
                    <div className="h-96 w-96 flex-row pb-10">
                        <Carousel slideInterval={2500} slide={true} indicators={false}
                            leftControl="<<"
                            rightControl=">>">
                            {
                                artistImages.map((picture, i) => {
                                    return (
                                        <div className="relative duration-1000 ease-in-out" key={i}>
                                            <img className="rounded-lg artistImage" src={picture.sources[0]?.url} />
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                </div>
                <br />
                <div className="grid grid-cols-2 gap-2">
                    <div className="ml-6">
                        <h2 className="artistHeading py-4">Albums</h2>
                        <div className="artistTable">
                            <Table>
                                <Table.Head>
                                    <Table.HeadCell>
                                        {artistInfo?.artist?.profile?.name}'s Discography
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        Tracks
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {/* {console.log(albumInfo)} */}
                                    {artistAlbum.map((album, index) => {
                                        // console.log(index)
                                        return (
                                            <Table.Row className="dark:border-gray-700 dark:bg-gray-800" key={index}>
                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    <img className="rounded-lg artistImage" src={album.releases?.items[0]?.coverArt?.sources?.[0]?.url} width={300} />
                                                    <h2 className="white-text font-bold py-1 mt-4 pb-4 text-center">{album.releases?.items[0]?.name}</h2>
                                                    <h3 className="grey-text py-1 text-center">Release year: {album.releases?.items[0]?.date?.year}</h3>
                                                    <h3 className="grey-text py-1 text-center">Number of tracks: {album.releases?.items[0]?.tracks?.totalCount}</h3>
                                                    <h3 className="grey-text py-1 text-center">Label: {album.releases?.items[0]?.label}</h3>
                                                </Table.Cell>
                                                <Table.Cell className="leading-loose whitespace-wrap font-medium text-gray-900 dark:text-white">
                                                    {albumInfo[index].map((tracks, i) => {                                                        
                                                        console.log(tracks)
                                                        return (
                                                            <>
                                                                <div className="playlistItem" key={i} id={i} style={{ display: "flex", justifyContent: "space-between" }}>
                                                                    <p className="grey-text">{tracks[i][0]}</p>
                                                                    <p className="grey-text">{tracks[i][1]}</p>
                                                                    <img src={Hamburger} className="hamburger" style={{ display: "block" }} width={"30px"} onClick={() => toggleModal("")} />
                                                                </div>
                                                                {/* <TrackOptions client={props.client} key={i} name={tracks[i]?.uri} /> */}
                                                            </>
                                                        )
                                                    })}
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h2 className="artistHeading py-4">Bio</h2>
                            {
                                bio && <div className="artistText py-3 text-justify" dangerouslySetInnerHTML={createMarkup(bio)} />
                            }
                        </div>
                        <div>
                            <h2 className="artistHeading py-4">Social</h2>
                            {artistSocials.map((info, i) => {
                                return (
                                    <a href={info?.url} key={i}><p className="py-1">{info?.name}</p></a>
                                )
                            })}
                        </div>
                        <div>
                            <h2 className="artistHeading py-4">Following</h2>
                            <p className="artistText py-1">Followers: {artistInfo?.artist?.stats?.followers}</p>
                            <p className="artistText py-1">Monthly listeners: {artistInfo?.artist?.stats?.monthlyListeners}</p>
                        </div>
                        <div>
                            <h2 className="artistHeading py-4">Events</h2>
                            <p className="artistText py-1">Title: {artistInfo?.artist?.goods?.events?.concerts?.items[0]?.title} | {artistInfo?.artist?.goods?.events?.concerts?.items[0]?.category}</p>
                            <p className="artistText py-1">Venue: {artistInfo?.artist?.goods?.events?.concerts?.items[0]?.venue?.name}</p>
                            <p className="artistText py-1">Location: {artistInfo?.artist?.goods?.events?.concerts?.items[0]?.venue?.location?.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ArtistPage;