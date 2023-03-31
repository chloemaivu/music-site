import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

function NavbarLoggedIn(props) {
  const user = props.user

  return (
    <Navbar id="navbar" className="navigationBar" fluid={true} rounded={true}>
      <Navbar.Brand href="#homepage">
        <Link to="/home">
          <span className="navigationLogo self-center whitespace-nowrap">
            VANTA
          </span>
        </Link>
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
          <Link to="/user-settings">
            <Dropdown.Item className="dropdownItem p-3 text-center">Settings</Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item className="dropdownItem2 p-3 text-center"
            onClick={() => props.logout()}>Log out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/home" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/community">Community</Navbar.Link>
        <Navbar.Link href="/profile">Your Profile</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarLoggedIn;
