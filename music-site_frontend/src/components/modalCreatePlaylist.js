import React from "react"
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react"
import { onClick, onClose } from "react"


function CreatePlaylistModal(props) {

    const onClick = () => {
        let x = document.getElementById("createPlaylistModal")
        if (x.style.display === "none") {
            x.style.display = "block"
        } else {
            x.style.display = "none"
        }
    }

    async function submitHandler(e) {
        e.preventDefault()
        props.client.createPlaylist(
            e.target.name.value,
            e.target.description.value,
            e.target.privacy.value)
        .then((response) => {
            alert(response)
            onClick()
          })
          .catch((err) => {
            console.log(err);
            alert("an error occured, please try again");
          });
    }

    return (
        <>
            <Button onClick={onClick}>
                Create Playlist
            </Button>
            {/* ////////////////////////////////////////////////////////////////////////////// */}
            <div id="createPlaylistModal" className="modal border" style={{ display: "none" }}>
                <form onSubmit={(e) => submitHandler(e)}>
                    <p className="white-text text-3xl">Create new playlist</p>
                    <br />
                    <p className="white-text text-xl">Playlist name</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="booty bouncin beats"
                        required />
                    <br />
                    <br />
                    <p className="white-text text-xl">Playlist description</p>
                    <textarea
                        name="description"
                        required
                    ></textarea>
                    <br />
                    <br />
                    <p className="white-text text-xl">Make the playlist private? </p>
                    <div id="privacy" style={{display: "flex", justifyContent: "space-around", margin: "10px"}}>
                        <div><input className="radio" type="radio" name="privacy" value="public" /> <span> public</span></div>
                        <div><input className="radio" type="radio" name="privacy" value="private"/> <span> private</span></div>
                    </div>
                    <p className="grey-text text-justify"> A public playlist can be seen by anyone on the site, and will automatically appear in the community page </p>
                    <br />
                    <hr />

                    <p className="text-justify grey-text p-1">Once you've created a playlist you can add songs or albums to it from wherever you find them on the site!</p>
                    <br />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button type="submit"> create playlist </Button>
                        <Button onClick={onClick}> cancel </Button>
                    </div>
                </form>
                {/* <div className="modalBackground" style={{ display: "none" }}></div> */}
            </div>
        </>
    )
}

export default CreatePlaylistModal