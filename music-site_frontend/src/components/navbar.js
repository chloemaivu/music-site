import { Navbar, Button } from "flowbite-react";

function NavbarPreLogin() {
  return (
    <Navbar className="navigationBar" fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <span className="navigationLogo self-center whitespace-nowrap dark:text-white">
          VANTA
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button
          outline={true}
          gradientDuoTone="cyanToBlue"
          type="submit"
          size="xl"
          href="/login"
        >
          Log In
        </Button>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

export default NavbarPreLogin;
