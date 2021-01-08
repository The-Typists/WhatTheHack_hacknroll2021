import React, { useState } from "react";
import { CodeBox } from "../components/CodeBox";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Button, InputGroup, FormControl } from "react-bootstrap";

function LoginPage(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    axios
      .post(`/users/login`, {
        username,
        password,
      })
      .then((res) => {
        console.log(res);
        const userdata = {
          id: res.data._id,
          username: res.data.username,
        };
        localStorage.setItem("user", JSON.stringify(userdata));
        props.setLoggedin(true);
      })
      .catch((res) => {
        console.log(res.response);
      });
  };
  console.log(username);
  console.log(password);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Consola",
      }}
    >
      <div style={{ marginBottom: 20, fontSize: 24 }}>Login</div>
      <form>
        <InputGroup>
          <FormControl
            onChange={(x) => setUsername(x.target.value)}
            placeholder="Username"
          />
        </InputGroup>

        <br />
        <InputGroup>
          <FormControl
            onChange={(x) => setPassword(x.target.value)}
            placeholder="Password"
          />
        </InputGroup>
        {/* nb: passwords will be stored in plain text, need to indicate to them, or submit as a hash */}
        <br />
      </form>
      <Button variant="dark" onClick={loginHandler}>
        Log In
      </Button>
    </div>
  );
}

export default LoginPage;
