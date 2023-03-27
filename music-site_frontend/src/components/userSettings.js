import { useEffect, useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function UserSettings(props) {
    const [userDisabled, setUserDisabled] = useState(false);
    const [passwordDisabled, setPasswordDisabled] = useState(false);
    const userData = props.user


    const updateHandler = async (e) => {
        e.preventDefault();
        const i = e.target;
        props.client.updateUserData(
            window.localStorage.currentUserID,
            i.username.value,
            i.email.value,
            i.picture.value
        );
        setUserDisabled(true);
    }

    const passwordHandler = async (e) => {
        e.preventDefault();
        const i = e.target

        if (i.newPassword.value != i.repeatNewPassword.value) {
            alert("Password and repeat password are not identical!")
        } else if (i.newPassword.value.length < 8) {
            alert("New password must be more 8 characters or more in length")
        } else {
            props.client.updatePassword(
                window.localStorage.currentUserID,
                i.currentPassword.value,
                i.newPassword.value,
            )
        };
        setPasswordDisabled(true)
    }

    return (
        <>
            <div className="border" style={{ display: "block", width: "60%", padding: "2%" }}>
                <h2 className="text-3xl">Update User Data</h2>
                <form onSubmit={(e) => updateHandler(e)}>
                    <div id="username">
                        <Label className="white-text mb-3" value="Username:" />
                        <TextInput
                            className="white-text"
                            defaultValue={userData?.username}
                            placeholder="username"
                            name="username"
                            type="text"
                            disabled={userDisabled}
                            required
                        />
                    </div>

                    <div id="email">
                        <Label className="white-text mb-3" value="Email:" />
                        <TextInput
                            type="email"
                            className="white-text"
                            defaultValue={userData?.email}
                            placeholder="user@email.com"
                            name="email"
                            disabled={userDisabled}
                            required
                        />
                    </div>

                    <div id="picture">
                        <Label className="white-text mb-3" value="Profile picture:" />
                        <TextInput type="text"
                            className="white-text"
                            name="picture"
                            defaultValue={userData?.picture}
                            placeholder="Enter your picture URL here"
                            disabled={userDisabled}
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
                        Update
                    </Button>
                </form>

                <h2 className="text-3xl">Update Password</h2>
                <form onSubmit={(e) => passwordHandler(e)}>

                    <div id="currentPassword">
                        <Label className="white-text mb-3" value="Current password:" />
                        <TextInput
                            type="password"
                            className="white-text"
                            placeholder="**********"
                            name="currentPassword"
                            disabled={passwordDisabled}
                            required
                        />
                    </div>

                    <div id="newPassword">
                        <Label className="white-text mb-3" value="Password:" />
                        <TextInput
                            type="password"
                            className="white-text"
                            placeholder="**********"
                            name="newPassword"
                            disabled={passwordDisabled}
                            required
                        />
                    </div>

                    <div id="repeatNewPassword">
                        <Label className="white-text mb-3" value="Repeat password:" />
                        <TextInput
                            type="password"
                            className="white-text"
                            placeholder="**********"
                            name="repeatNewPassword"
                            disabled={passwordDisabled}
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
                    href="/profile"
                >
                    return to profile
                </Button>
            </div>
        </>
    )
}

export default UserSettings