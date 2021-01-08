import React, { useEffect, useState, useRef } from "react";
import "./CodeBox.css";
import { useSock } from "../hooks/useSock";
import { Position } from "../pages/GameRoom";

interface Props {
  text: string;
  positions: Position[];
  name: string;
  roomCode: string;
}

export function CodeBox(props: Props) {
  const { text, name, roomCode } = props;
  const socket = useSock();
  const positions = props.positions.filter(
    (pos) => pos.username !== name && pos.position !== 0
  );

  const [userPointer, setUserPointer] = useState(0);
  const pointerRef: any = useRef();

  const positionMap: Record<number, string> = {};
  positions.forEach((p) => (positionMap[p.position] = p.color));

  const splitText = text.split("");

  useEffect(() => {
    pointerRef.current = () =>
      socket?.emit("send-position", {
        position: userPointer,
        roomCode: roomCode,
        playerName: name,
      });
  });

  useEffect(() => {
    if (userPointer === 1) {
      socket?.emit("player-start-game", { roomCode, name });
      console.log("Start");
    }

    if (userPointer !== 0 && userPointer === splitText.length) {
      socket?.emit("player-finish-game", { roomCode, name, text });
      console.log("End");
    }
  }, [userPointer]);

  useEffect(() => {
    function sendPos() {
      pointerRef.current();
    }
    let interval: NodeJS.Timeout;
    if (socket) {
      interval = setInterval(sendPos, 500);
    }
    return () => clearInterval(interval);
  }, [socket]);

  const renderOther = (color: string, c: string) => (
    <span style={{ backgroundColor: color }}>{c}</span>
  );

  const renderDone = (c: string) => <span style={{ color: "green" }}>{c}</span>;

  return (
    <div
      className={"container"}
      style={{ margin: "1rem" }}
      onKeyDown={(e) => {
        const isCorrectKeyPress =
          e.key == text[userPointer] ||
          (e.key == "Enter" && text[userPointer] == "\n");

        if (isCorrectKeyPress) {
          setUserPointer((prev) => prev + 1);
        }
      }}
      tabIndex={0}
    >
      {splitText.slice(0, userPointer).map((char, i) => {
        if (positionMap[i]) return renderOther(positionMap[i], char);

        return renderDone(char);
      })}
      {splitText[userPointer] === " " ? (
        <span style={{ backgroundColor: "red" }}>{splitText[userPointer]}</span>
      ) : (
        <span style={{ color: "red" }}>{splitText[userPointer]}</span>
      )}
      {userPointer < splitText.length &&
        splitText.slice(userPointer + 1).map((char, i) => {
          {
            if (positionMap[i + userPointer + 1])
              return renderOther(positionMap[i + userPointer + 1], char);
            return <span>{char}</span>;
          }
        })}
    </div>
  );
}
