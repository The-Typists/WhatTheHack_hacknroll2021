import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, InputGroup, FormControl } from "react-bootstrap";

function SignupPage({ setLoggedin }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signUpHandler = () => {
    axios
      .post(`/users/add`, {
        username,
        password,
      })
      .then((res) => {
        console.log(res);
        setLoggedin(true);
        history.push("/stats");
      })
      .catch((res) => {
        console.log(res);
      });
  };

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
      <div style={{ marginBottom: 20, fontSize: 24 }}>Signup</div>
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

        <br />
      </form>
      <Button variant="dark" onClick={signUpHandler}>
        Sign Up
      </Button>
    </div>
  );
}

export default SignupPage;
