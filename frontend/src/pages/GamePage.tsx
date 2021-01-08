import React, {useEffect, useState} from "react";

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
      <div style={{ marginBottom: 20, fontSize: 24 }}>Practice Mode</div>
      <PracticeBox style={{ margin: 10 }} />
    </div>
  );
}

const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

function PracticeBox(props: any) {
  const { style } = props;
  const [ptr, setPtr] = useState(0);

    const {
        elapsedTime,
        resetTimer,
        startTimer,
        stopTimer,
    } = useStopwatch();


    return (
        <div className={"container"} style={{ margin: style.margin }}
             onKeyDown={(e) => {
                 if (ptr == 0) {
                     startTimer()
                 }
                 const isCorrectKeyPress =
                     e.key == text[ptr] ||
                     (e.key == "Enter" && text[ptr] == "\n");

                 if(isCorrectKeyPress) {
                     setPtr(ptr + 1);
                     if(ptr + 2 == text.length) stopTimer()

                 }
             }}
             tabIndex={0}
        >
            <p style={{ whiteSpace: "pre-wrap"}}>

                <span style={{color:"red"}}>{text.slice(0,ptr)}</span>
                <span style={{backgroundColor:"#FFE0AB"}}>{text[ptr]}</span>
                <span>{text.slice(ptr+1)}</span>
            </p>

            <p>Time Elapsed : {elapsedTime}</p>
            <button onClick={() => {
                setPtr(0)
                resetTimer()
            }
            }>Reset</button>
        </div>
    );
}

export const useTimer = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(
        () => {
            let interval: NodeJS.Timeout;
            if (isRunning) {
                interval = setInterval(
                    () => setElapsedTime(prevElapsedTime => prevElapsedTime + 0.1),
                    100
                );
            }
            return () => clearInterval(interval);
        },
        [isRunning]
    );

    return {
        isRunning,
        setIsRunning,
        elapsedTime,
        setElapsedTime
    };
};
export const useStopwatch = () => {
    const { isRunning, setIsRunning, elapsedTime, setElapsedTime } = useTimer();

    const handleReset = () => {
        setIsRunning(false);
        setElapsedTime(0);
    };

    return {
        elapsedTime: elapsedTime.toFixed(1),
        resetTimer: () => handleReset(),
        startTimer: () => setIsRunning(true),
        stopTimer: () => setIsRunning(false),
        // isRunning
    };
};

export default GamePage;
