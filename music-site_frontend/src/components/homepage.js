import { useState } from "react";
import Searchbar from "./searchbar";
import SearchResult from "./searchresult";

function Homepage(props) {
  const [searchData, setSearchData] = useState({});

  return (
    <>
    <p className="brand-title object-position: center">VANTA</p>
    <Searchbar client={props.client} searchFetch={(searchData) => setSearchData(searchData)}/>    
    <SearchResult search={searchData} /> 
    </>
  );
}

export default Homepage
