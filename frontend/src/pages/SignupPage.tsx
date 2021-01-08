import React, {useEffect, useState} from "react";
import axios from 'axios';


function SignupPage({ setLoggedin }:any) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const formHandler = (submission:any) => {
        alert(submission);
    }
    const signUpHandler = () => {
        axios.post(`/users/add`, {
             username,
             password
        }).then(res => {
            console.log(res)
            setLoggedin(true);
        }).catch(res => {
            console.log(res)
        })
    }
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Consola"
        }}>
            <div style={{marginBottom: 20, fontSize: 24}}>Signup</div>
            <form onSubmit={formHandler}>
                <label>Username :
                    <input onChange={x => setUsername(x.target.value)}/>
                </label>
                <br/>
                <label>Password :
                    <input onChange={x => setPassword(x.target.value)}/>
                </label>
                <br/>
            </form>
            <button onClick={signUpHandler}>Sign Up</button>
        </div>
    );
}


export default SignupPage;
