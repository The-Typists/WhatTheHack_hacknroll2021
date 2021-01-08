import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { CodeBox } from "../components/CodeBox";

function StatisticsPage() {
  const [totalAttempts, setTotalAttempts] = useState("");
  const [totalCharacters, setTotalCharacters] = useState("");
  const [totalWords, setTotalWords] = useState("");
  const [totalTime, setTotalTime] = useState(0);

  const id = JSON.parse(localStorage.getItem("user") || "{}").id;
  console.log(id);
  useEffect(() => {
    axios
      .get(`/profile/${id}`)
      .then((res: any) => {
        console.log(res);
        setTotalAttempts(res.data.totalAttempts);
        setTotalCharacters(res.data.totalCharacters);
        setTotalWords(res.data.totalWords);
        setTotalTime(res.data.totalTime);
      })
      .catch((err: any) => {
        console.log(err);
      });
  });

  return (
    <>
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
        <div style={{ marginBottom: 20, fontSize: 24 }}>Statistics</div>
        <div className="col-sm">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Components</th>
                <th>Your Results</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total attempts</td>
                <td>{totalAttempts}</td>
              </tr>
              <tr>
                <td>Total words</td>
                <td>{totalWords}</td>
              </tr>
              <tr>
                <td>Total Characters</td>
                <td>{totalCharacters}</td>
              </tr>
              <tr>
                <td>Total time spent</td>
                <td>{Math.floor(totalTime / 1000)} seconds</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default StatisticsPage;
