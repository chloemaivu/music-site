import { Navbar, Button } from "flowbite-react";

function NavbarPreLogin() {
  return (
    <Navbar className="navigationBar" fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <span className="navigationLogo self-center whitespace-nowrap dark:text-white">
          VANTA
        </span>
      </Navbar.Brand>
    </Navbar>
  );
}

export default NavbarPreLogin;
