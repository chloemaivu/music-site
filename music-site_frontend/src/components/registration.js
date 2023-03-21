import { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function RegisterView(props) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [picture, setPicture] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisabled(true);
    const i = e.target;

    props.client
      .register(
        i.username.value,
        i.email.value,
        i.password.value,
        i.repeatpassword.value,
        i.picture.value
      )
      .then((response) => {
        setDisabled(true)
        // reset form
        alert("Registration successful! You may now log in")
        navigate("/login")        
      })
      .catch(() => {
        alert("Error. Please try again.");
        setDisabled(false);
      });
  };
  return (
    <>
      <h1 className="text-5xl">Register here:</h1>
      <form onSubmit={(e) => submitHandler(e)}>
        <div controlId="username">
          <Label className="white-text mb-3" value="Username:" />
          <TextInput
            className="white-text"
            placeholder="username"
            name="username"
            type="text"
            disabled={disabled}
            required
          />
        </div>
        <div controlId="email">
          <Label className="white-text mb-3" value="Email:" />
          <TextInput
            type="email"
            className="white-text"
            placeholder="user@email.com"
            name="email"
            disabled={disabled}
            required
          />
        </div>
        <div controlId="password">
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
        <div controlId="repeatpassword">
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
        <div controlId="picture">
          <Label className="white-text mb-3" value="Profile picture:" />
          <TextInput type="text"
          className="white-text"
          name="picture"
          placeholder="Enter your picture URL here"
          disabled={disabled} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            className="mt-5"
            outline={true}
            gradientDuoTone="cyanToBlue"
            type="submit"
            size="xl"
          >
            Register
          </Button>
        </div>
      </form>
    </>
  );
}

export default RegisterView;
