import Searchbar from "./searchbar";


function Homepage(props) {
  return (
    <>
    <p className="brand-title object-position: center">VANTA</p>
    <Searchbar client={props.client} />
    </>
  );
}

export default Homepage
