import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Label, TextInput } from "flowbite-react";

function Login(props) {
  const [disabled, cDisabled] = useState(false);
  async function submit(e) {
    e.preventDefault();
    cDisabled(false);

    props.client
      .login(e.target.username.value, e.target.password.value)
      .then((response) => {
        cDisabled(false);
        props.loggedIn(response.data.token);
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
  );
}

export default Login;

// REACT BOOTSTRAP LOGIN FORM - REDUNDANT
// <>
//   <h1>Login</h1>
//   <div className="loginForm">
//     <form onSubmit={(e) => submit(e)}>
//       <Form.Group className="mb-3" controlId="formUsername">
//         <Form.Label className="white-text">Username / Email: </Form.Label>
//         <Form.Control
//           placeholder="username"
//           type="text"
//           name="username"
//           className="white-text"
//           disabled={disabled}
//         />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formPassword">
//         <Form.Label className="white-text">Password: </Form.Label>
//         <Form.Control
//           placeholder="password"
//           type="password"
//           name="password"
//           className="white-text"
//           disabled={disabled}
//         />
//       </Form.Group>

//       <div className="loginButton">
//         <Button
//           color="gray"
//           type="submit"
//           className="flex flex-wrap gap-2"
//           disabled={disabled}
//         >
//           Login
//         </Button>
//       </div>
//     </form>
//   </div>
// </>
