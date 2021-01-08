import React, {useEffect, useState} from "react";
import './CodeBox.css';
import socketClient  from "socket.io-client";

const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

export function CodeBox(props: any) {
    const {style} = props;
    const [ptr, setPtr] = useState(0);

    // Lobby size = 5 (incl yourself)
    const [opp, setOpp] = useState([0,0,0,0]);

    useEffect(() => {
        const SERVER = "http://127.0.0.1:2105";
        // @ts-ignore
        const socket = socketClient(SERVER);
        socket.on('connect', () => {
            console.log(`I'm connected with the back-end`);
        });
        socket.emit('initialize', text.length);
        socket.on('updatePos', (opp:any) => {
            setOpp(opp)
            console.log(opp);
        })
    },[])


    return (
        <div className={"container"} style={{ margin: style.margin }}
             onKeyDown={(e) => {
                 const isCorrectKeyPress =
                     e.key == text[ptr] ||
                     (e.key == "Enter" && text[ptr] == "\n");

                 if(isCorrectKeyPress) {
                     setPtr(ptr + 1);
                     console.log("Next Char is ", text[ptr + 1])
                 }
             }}
             tabIndex={0}
        >
            <p style={{
                whiteSpace: "pre-wrap",
                position: "relative",
                left: 0, top: 0, right: 0, bottom: 0,
            }}>

                <span style={{color:"red"}}>{text.slice(0,ptr)}</span>
                <span style={{backgroundColor:"#FFE0AB"}}>{text[ptr]}</span>
                <span>{text.slice(ptr+1)}</span>
            </p>
            <p style={{
                whiteSpace: "pre-wrap",
                zIndex: 100,
                position: "relative"
            }}>
                <span style={{opacity:0}}>{text.slice(0,opp[0])}</span>
                <span style={{backgroundColor:"#FFE0AB"}}>{text[opp[0]]}</span>
                <span style={{opacity:0}}>{text.slice(opp[0]+1)}</span>
            </p>
        </div>
    );
}
