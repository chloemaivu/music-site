function SiteInfo() {

    function swapView(id) {

    }

    return (
        <>
            <p className="brand-title object-position: center">VANTA</p>
            <div id="infoSelector" style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div id="aboutHeader" onClick={() => swapView()}>
                    <p className="white-text text-2xl">About VANTA</p>
                </div>
                <div id="privacyHeader" onClick={() => swapView()}>
                    <p className="white-text text-2xl">Privacy Policy</p>
                </div>
                <div id="contactHeader" onClick={() => swapView()}>
                    <p className="white-text text-2xl">Contact</p>
                </div>
            </div>
            <hr />
            <div>
                <div id="about"></div>
                <div id="privacy"></div>
                <div id="contact">
                    This site is a small project made by three 
                </div>
            </div>
        </>
    )


}

export default SiteInfo