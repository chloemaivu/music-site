import { useEffect,useState } from "react";
import Searchbar from "./searchbar";
import SearchResult from "./searchresult";
import { Button } from "flowbite-react";

function Homepage(props) {
  const [searchData, setSearchData] = useState({});

  const [artistURI, setArtistURI] = useState("")

  useEffect(() => {
    props.artistURI(artistURI)
  }, [artistURI])

  return (
    <>
    <p className="brand-title object-position: center">VANTA</p>
    <Searchbar client={props.client} searchFetch={(searchData) => setSearchData(searchData)}/>    
    <SearchResult search={searchData} artistURI={(artistURI) => setArtistURI(artistURI)} /> 
    </>
  );
}

export default Homepage
