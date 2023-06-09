import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

function HomepagePreLogin() {
  return (
    <>
      <p className="brand-title object-position: center">VANTA</p>
      <hr />
      <div>
        <h3 className="text-8xl object-position: center">About us</h3>
        <p className="text-5xl object-position: center mx-3" style={{marginLeft: "15%", marginRight:"15%", textAlign: "center"}}>
          Vanta is a music based social media site. Discover new music and share your
          music interests with your friends.
        </p>
      </div>
      <hr />
      <div className="center">
        <Link to="/login">
          <Button
            className="mt-8 text-5xl "
            outline={true}
            gradientDuoTone="cyanToBlue"
            type="submit"
            size="6xl"
          >
            Log in
          </Button>
        </Link>
        <Link to="/register">
          <Button
            className="mt-8 text-5xl"
            outline={true}
            gradientDuoTone="cyanToBlue"
            type="submit"
            size="6xl"
          >
            Register
          </Button>
        </Link>
      </div>
    </>
  );
}

export default HomepagePreLogin;
