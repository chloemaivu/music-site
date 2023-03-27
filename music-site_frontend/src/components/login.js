import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

function Login(props) {
  const navigate = useNavigate()
  const [disabled, cDisabled] = useState(false);
  async function submit(e) {
    e.preventDefault();
    cDisabled(false);

    props.client
      .login(e.target.username.value, e.target.password.value)
      .then((response) => {
        cDisabled(false);
        props.loggedIn(response.data.token, response.data.id);
        navigate("/home")
      })
      .catch((err) => {
        console.log(err);
        alert("an error occured, please try again");
        cDisabled(false);
      });
  }

  return (
    <>
      <div className="justify-items-center">
        <h1 className="text-5xl"> Login </h1>
        <form className="flex flex-col gap-4" onSubmit={(e) => submit(e)}>
          <div>
            <div className="mb-2 block white-text">
              <Label
                htmlFor="email1"
                className="white-text"
                value="Username / email address:"
              />
            </div>
            <TextInput
              placeholder=" Greg85 / greg@vanta.com"
              type="text"
              name="username"
              className="white-text"
              disabled={disabled}
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password1"
                className="white-text"
                value="Password:"
              />
            </div>
            <TextInput
              placeholder="password"
              type="password"
              name="password"
              className="white-text"
              disabled={disabled}
              required={true}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              className="mt-5"
              outline={true}
              gradientDuoTone="cyanToBlue"
              type="submit"
              size="xl"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login;
