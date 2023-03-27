import { React, useEffect, useRef, useState } from 'react';
import { Carousel, Table } from "flowbite-react";
import LoadingSpinner from './spinner';
import { useParams } from 'react-router-dom';
import "../artistsPage.css";

function ArtistPage(props) {
    const [artistInfoFilled, setartistInfoFilled] = useState(false);
    const [artistInfo, setArtistInfo] = useState({})
    const [artistSocials, setArtistSocials] = useState([])
    const [artistImages, setArtistImages] = useState([])
    const [bio, setBio] = useState("")

    const { artistId } = useParams()

    const getArtistInfo = async (uri) => {
        console.log("getArtistInfo is called")
        const data = await props.client.getArtist(uri);
        console.log(data)
        setArtistInfo(data)
        setArtistSocials(data.artist.profile.externalLinks.items) 
        setArtistImages(data.artist.visuals.gallery.items)      
        setBio(data.artist.profile.biography.text)
        console.log("Artist color is:" + data.artist.visuals.headerImage.extractedColors.colorRaw.hex)
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
            __html:html
        }
    }

    ////////////////////////////////////////////////////////////////////

    const imageSize = 600

    if (artistInfoFilled === false) {
        return (
            <LoadingSpinner />
        )
    } else if (artistInfoFilled === true) {
        return (
            <div>
                <div className="flex flex-col items-center justify-center border"
            style={{backgroundColor: `${artistInfo?.artist?.visuals?.headerImage?.extractedColors?.colorRaw?.hex}`}}
            >
                    <div className="flex-row">
                        <h1 className="artistTitle text-center py-5">{artistInfo?.artist?.profile?.name}</h1>
                    </div>
                    {/* Carousel for artist gallery */}
                    <div className="h-96 w-96 flex-row pb-10">
                    <Carousel>
                    {
                        artistImages.map(picture => {
                            return (
                            <div className="relative duration-700 ease-in-out">
                                <img src={picture.sources[0]?.url}/>
                            </div>
                            ) 
                        })
                    }
                    </Carousel>
                    </div>
                </div>
                <br />
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <h2 className="artistHeading py-4">Albums</h2>
                    {/* Latest album */}
                        <img src={artistInfo?.artist?.discography?.latest?.coverArt?.sources[0]?.url} width={imageSize} />
                        <h3 className="albumHeading py-4">{artistInfo?.artist?.discography?.latest?.name} | {artistInfo?.artist?.discography?.latest?.date?.year}</h3>
                    {/* Table element - All albums */}
                    <div className="discographyTable">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>
                            Discography
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                TO DO - MAP THROUGH ARTIST'S ALBUMS
                            </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                    </div>
                    </div>
                    <div>
                        <div>
                            <h2 className="artistHeading py-4">Bio</h2>
                                {
                                    bio && <div className="artistText py-3" dangerouslySetInnerHTML={createMarkup(bio)}/>
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
