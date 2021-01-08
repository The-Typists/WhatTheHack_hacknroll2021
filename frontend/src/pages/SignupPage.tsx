import React from "react";
import {CodeBox} from "../components/CodeBox";

function SignupPage() {
    const formHandler = (submission:any) => {
        alert(submission);
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
                <input type={"submit"} value={"Submit"}/>
            </form>
        </div>
    );
}


export default SignupPage;
