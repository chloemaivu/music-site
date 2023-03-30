import { React, useEffect, useRef, useState } from 'react';
import { Carousel, Table } from "flowbite-react";
import LoadingSpinner from './spinner';
import { useParams } from 'react-router-dom';

function ArtistPage(props) {
    const [artistInfoFilled, setartistInfoFilled] = useState(false)
    const [artistInfo, setArtistInfo] = useState({})
    const [artistSocials, setArtistSocials] = useState([])
    const [artistImages, setArtistImages] = useState([])
    const [artistAlbum, setArtistAlbum] = useState([])
    const [albumInfo, setAlbumInfo] = useState([])
    const [bio, setBio] = useState("")

    const { artistId } = useParams()

    const getArtistInfo = async (uri) => {
        const data = await props.client.getArtist(uri);
        const albumMapped = data.artist.discography.albums.items
        setArtistInfo(data)
        setArtistSocials(data.artist.profile.externalLinks.items)
        setArtistImages(data.artist.visuals.gallery.items)
        setArtistAlbum(data.artist.discography.albums.items)
        const albumIds = []

        // get album ids in an array
        albumMapped.map(
            albumId =>
                //add to array
                albumIds.push(albumId.releases?.items[0]?.id)
        )
        getDiscography(albumIds)
        setBio(data.artist.profile.biography.text)
    }

    const getDiscography = async (uri) => {
        const albumArrays = []
        const albums = []
        const response = await props.client.getAlbums(uri);
        // get albums data
        response.albums.map(albumData =>
            albumArrays.push(albumData.tracks.items)
        )
        albumArrays.map(album => {
            const tracks = []
            album.map(item => tracks.push(item.name))
            //array of tracks for each album
            albums.push(tracks)
        }
        )
        setAlbumInfo(albums)
    }

    useEffect(() => {
        async function fetchData() {
            await getArtistInfo(artistId)
            setartistInfoFilled(true)
        }
        fetchData()
    }, [artistId])

    function createMarkup(html) {
        return {
            __html: html
        }
    }

    ////////////////////////////////////////////////////////////////////

    if (artistInfoFilled === false && albumInfo.length == 0) {
        return (
            <LoadingSpinner />
        )
    } else if (artistInfoFilled === true && albumInfo.length > 0) {
        return (
            <div>
                <div className="flex flex-col items-center justify-center border"
                    style={{ background: `linear-gradient(45deg,${artistInfo?.artist?.visuals?.headerImage?.extractedColors?.colorRaw?.hex},${artistInfo?.artist?.visuals?.avatarImage?.extractedColors?.colorRaw?.hex}` }}
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
                                artistImages.map(picture => {
                                    return (
                                        <div className="relative duration-1000 ease-in-out">
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
                                    {artistAlbum.map((album, index) => {
                                        return (
                                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    <img className="rounded-lg artistImage" src={album.releases?.items[0]?.coverArt?.sources?.[0]?.url} width={300} />
                                                    <h2 className="text-gray-900 font-bold py-1 mt-4 pb-4 text-center">{album.releases?.items[0]?.name}</h2>
                                                    <h3 className="text-gray-800 py-1 text-center">Release year: {album.releases?.items[0]?.date?.year}</h3>
                                                    <h3 className="text-gray-800 py-1 text-center">Number of tracks: {album.releases?.items[0]?.tracks?.totalCount}</h3>
                                                    <h3 className="text-gray-800 py-1 text-center">Label: {album.releases?.items[0]?.label}</h3>
                                                </Table.Cell>
                                                <Table.Cell className="leading-loose whitespace-wrap font-medium text-gray-900 dark:text-white">
                                                    {albumInfo[index].map(tracks => {
                                                        return (
                                                            <p className="albumSong">{tracks}</p>
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
                            {artistSocials.map(info => {
                                return (
                                    <a href={info?.url}><p className="py-1">{info?.name}</p></a>
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