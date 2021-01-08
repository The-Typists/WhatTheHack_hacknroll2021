import React from "react";
import { CodeBox } from "../components/CodeBox";

function GamePage() {
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
      <div style={{ marginBottom: 20, fontSize: 24 }}>TypeRacer</div>
      {/* <CodeBox style={{margin: 10}}/> */}
    </div>
  );
}

export default GamePage;
