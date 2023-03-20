import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

function NavbarLoggedIn(props) {

  const user = props.user

  const logout = () => {
    window.localStorage.removeItem("token");
    props.token(undefined);
    props.authenticated(false);
    props.refresh(true)
  };

  return (
    <Navbar className="navigationBar" fluid={true} rounded={true}>
      <Navbar.Brand href="#homepage">
        <Link to="/">
          <span className="navigationLogo self-center whitespace-nowrap">
            VANTA
          </span>
        </ Link>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              img={(props) => (
                <img
                  referrerPolicy="no-referrer"
                  src={user.picture}
                  {...props} />)
              }
            />
          }
        >
          <Dropdown.Header>
            <span className="userNameSurname block text-md p-3 text-center">{user.username}</span>
            <span className="userEmail block truncate text-md font-medium p-3 text-center">
              {user.email}
            </span>
          </Dropdown.Header>
          <Link to="/profile">
            <Dropdown.Item className="dropdownItem p-3 text-center">Profile</Dropdown.Item>
          </Link>
          <Dropdown.Item className="dropdownItem p-3 text-center">Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item className="dropdownItem2 p-3 text-center"
            onClick={() => logout()}>Log out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars">Spotify picks</Navbar.Link>
        <Navbar.Link href="/navbars">Alternative Music</Navbar.Link>
        <Navbar.Link href="/navbars">Your playlists</Navbar.Link>
        <Navbar.Link href="/navbars">About Us</Navbar.Link>
      </Navbar.Collapse>
    </Navbar >
  );
}

export default NavbarLoggedIn;
