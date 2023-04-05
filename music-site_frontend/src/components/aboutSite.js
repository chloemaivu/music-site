function SiteInfo() {

    function swapView(id) {

    }

    return (
        <>
            <p className="brand-title object-position: center">VANTA</p>
            <div id="infoSelector" style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div id="aboutHeader" onClick={() => swapView("about")}>
                    <p className="white-text text-2xl">About VANTA</p>
                </div>
                <div id="privacyHeader" onClick={() => swapView("privacy")}>
                    <p className="white-text text-2xl">Privacy Policy</p>
                </div>
                <div id="contactHeader" onClick={() => swapView("contact")}>
                    <p className="white-text text-2xl">Contact</p>
                </div>
            </div>
            <hr />
            <div>
                <div id="about">
                    Vanta Site is a music discovery platform built using the MERN stack. 
                    It was implemented as part of a month-long group project and some features include user authentication and integration with the Spotify API. 
                    The website was developed using Agile scrum methodology, mob programming and individual programming over a period of one month. 
                    As a user, you can play music, search for music, create your own playlists and comment on others' playlists.
                </div>

                <div id="privacy">
                    
                </div>

                <div id="licensing">
                    This site uses the Spotify API. It includes an iframe from Spotify. It uses images from unsplash.
                </div>

                <div id="contact">
                    Hi! This website was created by Alex, Chloe, and Kristina.
                    We are junior software developers and created this website to showcase the skills we learnt on our web development bootcamp with the Developer Academy.
                    If you have any questions, suggestions or feedback about our website, we would love to hear from you! 
                    You can find us on Github and LinkedIn, where we regularly share our latest projects and insights. 
                    Feel free to reach out to us individually using the following links: [Alex's Github/LI], [Chloe's Github/LI], [Kristina's Github/LI]. 
                    We look forward to hearing from you!
                </div>
            </div>
        </>
    )


}

export default SiteInfo;