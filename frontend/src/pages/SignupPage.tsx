import React, {useEffect} from "react";
import axios from 'axios';


function SignupPage() {
    const formHandler = (submission:any) => {
        alert(submission);
    }
    const signUpHandler = () => {
        axios.post(`/users/add`, {
             username: "nope",
             password: "123"
        }).then(res => {
            alert(res);
        }).catch(res => {
            alert(res);
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
                    <input/>
                </label>
                <br/>
                <label>Password :
                    <input/>
                </label>
                <br/>
            </form>
            <button onClick={signUpHandler}>Sign Up</button>
        </div>
    );
}


export default SignupPage;
