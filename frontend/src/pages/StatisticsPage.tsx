import React, {useEffect, useState} from "react";
import axios from "axios";
import {CodeBox} from "../components/CodeBox";

function StatisticsPage() {
    const [totalAttempts, setTotalAttempts] = useState("");
    const id = JSON.parse(localStorage.getItem('user') || '{}').id
    console.log(id);
    useEffect(() => {
        axios.get(`/profile/${id}`)
            .then((res: any) => {
                console.log(res);
                setTotalAttempts(res.totalAttempts);
            })
            .catch((err: any) => {
                console.log(err);
            })
        }
    )


    return (
        <>
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Consola"
        }}>
            <div style={{marginBottom: 20, fontSize: 24}}>Statistics</div>
            <div>Total attempts: {totalAttempts}</div>
        </div>
        </>
    );
}


export default StatisticsPage;
