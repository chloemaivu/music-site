import { useEffect,useState } from "react";
import Searchbar from "./searchbar";
import SearchResult from "./searchresult";
import { Button } from "flowbite-react";

function Homepage(props) {
  const [searchData, setSearchData] = useState({});

  const [artistURI, setArtistURI] = useState("")
  const [songURI, setSongURI] = useState("")
  const [type, setType] = useState("")

  useEffect(() => {
    props.artistURI(artistURI)
  }, [artistURI])

  useEffect(() => {
    props.songURI(songURI)
  }, [songURI])

  useEffect(() => {
    props.type(type)
  }, [type])

  return (
    <>
    <p className="brand-title object-position: center">VANTA</p>
    <Searchbar client={props.client} searchFetch={(searchData) => setSearchData(searchData)}/>    
    <SearchResult search={searchData} artistURI={(artistURI) => setArtistURI(artistURI)} songURI={(songURI) => setSongURI(songURI)} type={(type) => setType(type)}/> 
    {/* <Button className="" onClick={() => props.client.getArtist("5kDp9RPBnmQzBLwVnVyVvz")}> get artists overview</Button> */}
    </>
  );
}

export default Homepage
