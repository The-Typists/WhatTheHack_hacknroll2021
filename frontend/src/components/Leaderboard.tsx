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

interface EndPosition {
  username: string;
  time: number;
}

interface Props {
  endingStats: EndPosition[];
  text: string;
}

const LeaderBoard = (props: Props) => {
  const { text, endingStats } = props;

  return (
    <Table
      style={{
        marginTop: 50,
        marginLeft: "auto",
        marginRight: "auto",
        width: "70%",
      }}
      striped
      bordered
      hover
      variant={"dark"}
    >
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
          .sort((a, b) => a.time - b.time)
          .map((playerStats, index) => (
            <tr style={{ color: "red" }}>
              <td>{index + 1}</td>
              <td>{playerStats.username}</td>
              <td>
                {Math.floor(
                  text.split(" ").length / (playerStats.time / 60 / 1000)
                )}
              </td>
              <td>
                {Math.floor(text.length / (playerStats.time / 60 / 1000))}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default LeaderBoard;
