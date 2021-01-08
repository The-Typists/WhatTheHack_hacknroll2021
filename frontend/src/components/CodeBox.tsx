import React, { useEffect, useState } from "react";
import './CodeBox.css';
import socketClient from "socket.io-client";

const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

export function CodeBox(props: any) {
    const { style } = props;
    const [userPointer, setUserPointer] = useState(0);

    // Lobby size = 5 (incl yourself)
    const [opp, setOpp] = useState([0, 0, 0, 0]);

    useEffect(() => {
        const SERVER = "http://127.0.0.1:2105";
        // @ts-ignore
        const socket = socketClient(SERVER);
        socket.on('connect', () => {
            console.log(`I'm connected with the back-end`);
        });
        socket.emit('initialize', text.length);
        socket.on('updatePos', (opp: any) => {
            setOpp(opp)
            console.log("opp:", opp)
        })
    }, [])
    

    const otherPlayers = [
        {
            position: opp[1],
            color: "yellow",
        },
        {
            position: opp[2],
            color: "green",
        },
        {
            position: opp[3],
            color: "blue",
        },
        {
            position: opp[4],
            color: "pink",
        },
    ];

    return (
        <div
            className={"container"}
            style={{ margin: style.margin }}
            onKeyDown={(e) => {
                const isCorrectKeyPress =
                    e.key == text[userPointer] ||
                    (e.key == "Enter" && text[userPointer] == "\n");

                if (isCorrectKeyPress) {
                    setUserPointer(userPointer + 1);
                    console.log("Next Char is ", text[userPointer + 1])
                }
            }
            } tabIndex={0}
        >
            {text.split("").map((char, i) => {
                {  
                    if (i <= userPointer) {
                        return <span style={{ color: "red" }}>{char}</span>
                    }
                    const samePos = otherPlayers.filter(x => x.position == i)
                    for (let player of samePos) {
                        return <span style={{ backgroundColor: player.color, border: "1px solid red" }}>{char}</span>
                    }
                    return <span>{char}</span>
                }
            })}

        </div>
    )



    return (
        <div className={"container"} style={{ margin: style.margin }}
            onKeyDown={(e) => {
                const isCorrectKeyPress =
                    e.key == text[userPointer] ||
                    (e.key == "Enter" && text[userPointer] == "\n");

                if (isCorrectKeyPress) {
                    setUserPointer(userPointer + 1);
                    console.log("Next Char is ", text[userPointer + 1])
                }
            }}
            tabIndex={0}
        >
            <p style={{
                whiteSpace: "pre-wrap",
                position: "relative",
                left: 0, top: 0, right: 0, bottom: 0,
            }}>

                <span style={{ color: "red" }}>{text.slice(0, userPointer)}</span>
                <span>
                    <span style={{ backgroundColor: "#FFE0AB" }}>{text[userPointer]}</span>
                </span>

                <span>{text.slice(userPointer + 1)}</span>
            </p>

            {/*============= overlay====== */}
            <p style={{
                whiteSpace: "pre-wrap",
                zIndex: 100,
                position: "relative"
            }}>
                <span style={{ opacity: 0 }}>{text.slice(0, opp[0])}</span>
                <span style={{ opacity: 0 }}>{text.slice(opp[0] + 1)}</span>
            </p>
        </div>
    );
}
