import { useEffect, useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function UserSettings(props) {
    const [disabled, setDisabled] = useState(false);
    const userData = props.user

    console.log(userData)

    const updateHandler = async (e) => {
        e.preventDefault();
        setDisabled(true);
        const i = e.target
        console.log(i)
    }

    const passwordHandler = async (e) => {
        e.preventDefault();
        setDisabled(true);
        const i = e.target;
        console.log(i)
    }

    const stringify = (value) =>{
        return JSON.stringify(value)
    }

    useEffect(() => {
        stringify(userData?.username)
        console.log(typeof userData?.username)
    }, [userData])

    return (
        <>
            <div className="border" style={{ display: "block" }}>
                <h2>Update Password</h2>
                <form onSubmit={(e) => updateHandler(e)}>
                    <div id="username">
                        <Label className="white-text mb-3" value="Username:" />
                        <TextInput
                            className="white-text"
                            value={stringify(userData?.username)}
                            placeholder="username"
                            name="username"
                            type="text"
                            disabled={disabled}
                            required
                        />
                    </div>

                    <div id="email">
                        <Label className="white-text mb-3" value="Email:" />
                        <TextInput
                            type="email"
                            className="white-text"
                            value={stringify(userData?.email)}
                            placeholder="user@email.com"
                            name="email"
                            disabled={disabled}
                            required
                        />
                    </div>

                    <div id="picture">
                        <Label className="white-text mb-3" value="Profile picture:" />
                        <TextInput type="text"
                            className="white-text"
                            name="picture"
                            value={stringify(userData?.picture)}
                            placeholder="Enter your picture URL here"
                            disabled={disabled} />
                    </div>

                    <Button
                        className="mt-5"
                        outline={true}
                        gradientDuoTone="cyanToBlue"
                        type="submit"
                        size="xl"
                    >
                        Update
                    </Button>
                </form>

                <h2>Update Password</h2>
                <form onSubmit={(e) => passwordHandler(e)}>

                    <div id="currentpassword">
                        <Label className="white-text mb-3" value="Current password:" />
                        <TextInput
                            type="password"
                            className="white-text"
                            placeholder="**********"
                            name="password"
                            disabled={disabled}
                            required
                        />
                    </div>

                    <div id="password">
                        <Label className="white-text mb-3" value="Password:" />
                        <TextInput
                            type="password"
                            className="white-text"
                            placeholder="**********"
                            name="password"
                            disabled={disabled}
                            required
                        />
                    </div>

                    <div id="repeatpassword">
                        <Label className="white-text mb-3" value="Repeat password:" />
                        <TextInput
                            type="password"
                            className="white-text"
                            placeholder="**********"
                            name="repeatpassword"
                            disabled={disabled}
                            required
                        />
                    </div>

                    <Button
                        className="mt-5"
                        outline={true}
                        gradientDuoTone="cyanToBlue"
                        type="submit"
                        size="xl"
                    >
                        update password
                    </Button>
                </form>

                <Button
                    className="mt-5"
                    outline={true}
                    gradientDuoTone="cyanToBlue"
                    type="submit"
                    size="xl"
                    to="/"
                >
                    return to profile
                </Button>
            </div>
        </>
    )
}

export default UserSettings