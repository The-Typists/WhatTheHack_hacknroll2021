import React, { useEffect, useState } from "react";
import { useSock } from "../hooks/useSock";
import Table from "react-bootstrap/Table";


/* 

interface EndPosition {
  username: string;
  time: number;
}
u get an array of this
i can probably pass u the text too
so u will have text + array of that
and just need in sorted order
and some way to display
*/

const LeaderBoard = () => {

    const socket = useSock();
    const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
    const [endingStats, setEndingStats] = useState([
        {username: "xx", time : 1223 },
        {username: "yy", time : 13234 },
    ])



    // useEffect(() => {
    //     if (socket) {
    //       socket.on("end-position", (endingStats: any) => {
    //         console.log(endingStats);
    //         setEndingStats(endingStats);
    //       });
    //     }
    //   }, [socket]);
    return (
        <Table striped bordered hover variant={"dark"}>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>UserName</th>
                    <th> WPM </th>
                    <th> CPM </th>
                </tr>
            </thead>
            <tbody>
                {endingStats
                .sort((a,b) => a.time - b.time)
                .map((playerStats, index) => (
                    <tr style={{ color: "red" }}>
                        <td>{index + 1}</td>
                        <td>{playerStats.username}</td>
                        <td>{
                            text.split(" ").length / Math.floor(playerStats.time / 60)
                        }</td>
                        <td>{
                            text.split("").length / Math.floor(playerStats.time / 60)
                        }</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
};

export default LeaderBoard;
