import { React, useEffect, useState } from 'react';
// import { Table } from "flowbite-react";
import LoadingSpinner from './spinner';

function ArtistPage(props) {
    const [artistInfoFilled, setartistInfoFilled] = useState(false);
    const [artistInfo, setArtistInfo] = useState({})

    const getArtistInfo = async (uri) => {
        console.log("getArtistInfo is called")
        const data =  await props.client.getArtist(uri);
        console.log(data)
        setArtistInfo(data)
    }

    useEffect( async() => {
        await getArtistInfo(props.artistURI)
        setartistInfoFilled(true)
    }, [props.artistURI])

    ////////////////////////////////////////////////////////////////////

    const imageSize = 600

    if (artistInfoFilled === false) {
        return (
            <LoadingSpinner />
        )
    } else if (artistInfoFilled === true) {
        return (
            <div>
                <h1>{artistInfo?.artist?.profile?.name}</h1>
                <img src={artistInfo?.artist?.visuals?.avatarImage?.sources[0]?.url} width={imageSize} />
                <br />
                <div>
                    <div>
                        <h2>Albums</h2>
                        <div>
                            <img src={artistInfo?.artist?.discography?.latest?.coverArt?.sources[0]?.url} width={imageSize} />
                            <h3>{artistInfo?.artist?.discography?.latest?.name} | {artistInfo?.artist?.discography?.latest?.date?.year}</h3>
                        </div>
                    </div>
                    <div>
                        <div>
                        <h2>Bio</h2>
                        <p>{artistInfo?.artist?.profile?.biography?.text}</p>
                        </div>
                    </div>
                    <div>
                        <h2>Social</h2>
                        <h5>{artistInfo?.artist?.profile?.externalLinks?.items?.[0]?.name}</h5>
                        <a href={artistInfo?.artist?.profile?.externalLinks?.items?.[0]?.url}></a>
                        <h5>{artistInfo?.artist?.profile?.externalLinks?.items?.[1]?.name}</h5>
                        <a href={artistInfo?.artist?.profile?.externalLinks?.items?.[1]?.url}></a>
                        <h5>{artistInfo?.artist?.profile?.externalLinks?.items?.[3]?.name}</h5>
                        <a href={artistInfo?.artist?.profile?.externalLinks?.items?.[3]?.url}></a>
                    </div>
                    <div>
                        <h2>Following</h2>
                        <p>Followers: {artistInfo?.artist?.stats?.followers}</p>
                        <p>Monthly listeners: {artistInfo?.artist?.stats?.monthlyListeners}</p>
                    </div>
                    <div>
                        <h2>Events</h2>
                        <p>Title: {artistInfo?.artist?.goods?.events?.concerts?.items[0]?.title} | {artistInfo?.artist?.goods?.events?.concerts?.items[0]?.category}</p>
                        <p>Venue: {artistInfo?.artist?.goods?.events?.concerts?.items[0]?.venue?.name}</p>
                        <p>Location: {artistInfo?.artist?.goods?.events?.concerts?.items[0]?.venue?.location?.name}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ArtistPage;
