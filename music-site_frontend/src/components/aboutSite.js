import { useEffect, useState } from "react"

function SiteInfo() {

    const [section, setSection] = useState()

    const sectionIds = ["about", "privacy", "licensing", "contact"]
    const headerIds = ["aboutHeader", "privacyHeader", "licensingHeader", "contactHeader"]

    function toggleSection(arr, section, arr2, selection) {
        let v = document.getElementById(section)
        let b = document.getElementById(selection)
        arr.forEach(subSection => {
            document.getElementById(subSection).style.display = "none"
        })
        arr2.forEach(subSection => {
            document.getElementById(subSection).style.background = "none"
        })
        v.style.display = "block";
        b.style.backgroundColor = "#a2c4bd"
        b.style.padding = "1em"
        b.style.borderRadius = "0.25em"
    }

    return (
        <>
            <p className="brand-title object-position: center">VANTA</p>
            <br />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }} >
                <span
                    id="aboutHeader"
                    style={{ cursor: "pointer" }}
                    className="white-text text-3xl font-extrabold"
                    onClick={() => toggleSection(sectionIds, sectionIds[0], headerIds, headerIds[0])}>ABOUT VANTA</span>

                <span
                    id="privacyHeader"
                    style={{ cursor: "pointer" }}
                    className="white-text text-3xl font-extrabold"
                    onClick={() => toggleSection(sectionIds, sectionIds[1], headerIds, headerIds[1])}>PRIVACY POLICY</span>

                <span
                    id="licensingHeader"
                    style={{ cursor: "pointer" }}
                    className="white-text text-3xl font-extrabold"
                    onClick={() => toggleSection(sectionIds, sectionIds[2], headerIds, headerIds[2])}>LICENSING</span>

                <span
                    id="contactHeader"
                    style={{ cursor: "pointer" }}
                    className="white-text text-3xl font-extrabold"
                    onClick={() => toggleSection(sectionIds, sectionIds[3], headerIds, headerIds[3])}>CONTACT</span>
            </div>
            <hr />
            <div style={{ marginLeft: "15%", marginRight: "15%" }} >
                <div id="about" style={{ display: "none", textAlign: "justify" }} >
                    <br />
                    <p className="white-text text-xl" >
                        Vanta Site is a music discovery platform built using the MERN stack.
                        It was implemented as part of a month-long group project and some features include user authentication and integration with the Spotify API.
                        The website was developed using Agile scrum methodology, mob programming and individual programming over a period of one month.
                        As a user, you can play music, search for music, create your own playlists and comment on others' playlists.
                    </p>
                    <br />
                </div>

                <div id="privacy" style={{ display: "none", textAlign: "justify" }}>
                    <br />
                    <p className="white-text text-xl" >
                        At Vanta, we take your privacy seriously. We are committed to protecting your personal information and being transparent about how we use it. This Privacy Policy explains the types of information we collect from you and how we use and protect that information.
                    </p>
                    <br />

                    <p className="white-text text-2xl"><u>Types of Information We Collect</u></p>
                    <p className="white-text text-xl" >
                        We collect information that you provide to us when you sign up for an account. This includes your username, email address. We may also collect information about your usage of the site, such as the songs you listen to and the playlists you create.
                    </p>
                    <br />

                    <p className="white-text text-2xl"><u>How We Use Your Information</u></p>
                    <p className="white-text text-xl" >
                        We use your information to provide you with a personalized experience on our site, such as allowing you to access your curated playlists.
                    </p>
                    <br />

                    <p className="white-text text-2xl"><u>Protection of Your Information</u></p>
                    <p className="white-text text-xl" >We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. We store your information on secure servers and use encryption to protect sensitive information such as payment details. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee the absolute security of your information.
                    </p>
                    <br />

                    <p className="white-text text-2xl"><u>Sharing of Your Information</u></p>
                    <p className="white-text text-xl" >We share your searches with a third-party service provider - Spotify. Spotify assists us in playing music as we use their iframes. We will not sell your information to third parties.
                    </p>
                    <br />

                    <p className="white-text text-2xl"><u>Your Rights</u></p>
                    <p className="white-text text-xl">You have the right to access, correct, or delete your personal information that we have collected. If you have any questions or concerns about your privacy or your personal information, please contact us at.
                    </p>
                    <br />

                    <p className="white-text text-2xl"><u>Changes to this Policy</u></p>
                    <p className="white-text text-xl">We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will post the updated policy on our site and notify you of any significant changes.
                    </p>
                    <br />
                    <p className="white-text text-xl">Thank you for using Vanta.</p>
                    <br />
                </div>

                <div id="licensing" style={{ display: "none", textAlign: "justify" }} >
                    <br />
                    <p className="white-text text-xl">
                        At Vanta, we take licensing and copyright seriously.
                        All the music on our site is licensed from Spotify who have the necessary rights to distribute the music.
                        Images used are either from Unsplash and copyright free, or from the Spotify API via Rapid API.
                    </p>
                    <br />
                </div>
                <div id="contact" style={{ display: "none", textAlign: "justify" }} >
                    <br />
                    <p className="white-text text-xl">
                        Hi! This website was created by Alex, Chloe, and Kristina.
                        We are junior software developers and created this website to showcase the skills we learnt on our web development bootcamp with the Developer Academy.
                        If you have any questions, suggestions or feedback about our website, we would love to hear from you!
                        You can find us on Github and LinkedIn, where we regularly share our latest projects and insights.
                        Feel free to reach out to us individually using the following links:
                    </p>
                    <br />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                        <div >
                            <p style={{ fontWeight: "bold" }}>Alex</p>
                            <p style={{ textDecoration: "underline" }}><a href="https://github.com/TaureHorn" target="_blank">Github</a></p>
                            <p style={{ textDecoration: "underline" }}><a href="https://www.linkedin.com/in/alex-b-39193683/" target="_blank">LinkedIn</a></p>
                        </div>

                        <div>
                            <p style={{ fontWeight: "bold" }}>Chloe</p>
                            <p style={{ textDecoration: "underline" }}><a href="https://github.com/chloemaivu" target="_blank">Github</a></p>
                            <p style={{ textDecoration: "underline" }}><a href="https://www.linkedin.com/in/chloemaivu/" target="_blank">LinkedIn</a></p>
                        </div>

                        <div>
                            <p style={{ fontWeight: "bold" }}>Kristina</p>
                            <p style={{ textDecoration: "underline" }}><a href="https://github.com/kbugaite" target="_blank">Github</a></p>
                            <p style={{ textDecoration: "underline" }}><a href="https://www.linkedin.com/in/kristinabugaite/" target="_blank">LinkedIn</a></p>
                        </div>
                    </div>

                    <br />
                    <p className="white-text text-xl">
                        We look forward to hearing from you!
                    </p>
                    <br />
                </div>
            </div >
        </>
    )


}

export default SiteInfo;