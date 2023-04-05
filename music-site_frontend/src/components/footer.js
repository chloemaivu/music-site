import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import SiteInfo from "./aboutSite";

function VantaFooter() {
  return (
    <Footer container={true}>
      <div id="footer" className="w-full text-center white-text">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Link to="/">
          <span className="navigationLogo self-center whitespace-nowrap dark:text-white">
            VANTA
          </span>
          </Link>
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="VantaMusic™" year={2023} />
      </div>
    </Footer>
  );
}

export default VantaFooter;
