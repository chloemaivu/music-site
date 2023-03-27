import { useEffect,useState } from "react";
import Searchbar from "./searchbar";
import SearchResult from "./searchresult";
import { Button } from "flowbite-react";

function Homepage(props) {
  const [searchData, setSearchData] = useState({});
  const [songURI, setSongURI] = useState("")
  const [type, setType] = useState("")

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
    <SearchResult search={searchData} songURI={(songURI) => setSongURI(songURI)} type={(type) => setType(type)}/> 
    </>
  );
}

export default Homepage
