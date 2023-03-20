import { Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";

function NavbarPreLogin() {
  return (
    <Navbar className="navigationBar" fluid={true} rounded={true}>
      <Navbar.Brand href="#homepage">
        <Link to="/">
          <span className="navigationLogo self-center whitespace-nowrap dark:text-white">
            VANTA
          </span>
        </Link>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button
          outline={true}
          gradientDuoTone="cyanToBlue"
          type="submit"
          size="xl"
        >
          Log In
        </Button>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

export default NavbarPreLogin;
