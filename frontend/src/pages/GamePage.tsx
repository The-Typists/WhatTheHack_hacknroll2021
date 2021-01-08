import React, { useEffect, useState } from "react";

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

const text_ = `package org.arpit.java2blog;

import java.util.Scanner;

public class FizzBuzzMain {
 
	public static void main(String[] args) {
 
		Scanner s = new Scanner(System.in);
		System.out.println("Enter number:");
		int n = s.nextInt();
		System.out.println("The FizzBuzz numberswill be: ");
		for (int i = 1; i <= n; i++) {
			if (i % 3 == 0 && i % 5 == 0) { //multiple of 3 & 5
				System.out.print("FizzBuzz");
			} else if (i % 3 == 0) { //multiple of 3
				System.out.print("Fizz");
			} else if (i % 5 == 0) { //multiple of 5
				System.out.print("Buzz");
			} else {
				System.out.print(i);
			}
			System.out.print(" ");
		}
		s.close();
	}
}`;

function PracticeBox(props: any) {
  const { style } = props;
  const [ptr, setPtr] = useState(0);

  const { elapsedTime, resetTimer, startTimer, stopTimer } = useStopwatch();
  const text = text_.replaceAll("\t", " ");
  return (
    <div
      className={"container"}
      style={{ margin: style.margin }}
      onKeyDown={(e) => {
        e.preventDefault();
        if (ptr == 0) {
          startTimer();
        }
        const isCorrectKeyPress =
          e.key == text[ptr] ||
          (e.key === "Enter" && text[ptr] === "\n") ||
          (e.key === "Tab" && text[ptr] === "\t");

        if (isCorrectKeyPress) {
          setPtr(ptr + 1);
          if (ptr + 2 == text.length) stopTimer();
        }
      }}
      tabIndex={0}
    >
      <p style={{ whiteSpace: "pre-wrap" }}>
        <span style={{ color: "red" }}>{text.slice(0, ptr)}</span>
        <span style={{ backgroundColor: "#FFE0AB" }}>{text[ptr]}</span>
        <span>{text.slice(ptr + 1)}</span>
      </p>

      <p>---------------------------</p>
      <p>Time Elapsed : {elapsedTime.toFixed(1)}</p>
      <p>
        WPM :{" "}
        {((text.slice(0, ptr).split(" ").length / elapsedTime) * 60).toFixed(0)}
      </p>
      <p>---------------------------</p>
      <button
        onClick={() => {
          setPtr(0);
          resetTimer();
        }}
      >
        Reset
      </button>
    </div>
  );
}

export const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(
        () => setElapsedTime((prevElapsedTime) => prevElapsedTime + 0.1),
        100
      );
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    isRunning,
    setIsRunning,
    elapsedTime,
    setElapsedTime,
  };
};
export const useStopwatch = () => {
  const { isRunning, setIsRunning, elapsedTime, setElapsedTime } = useTimer();

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  return {
    elapsedTime: elapsedTime,
    resetTimer: () => handleReset(),
    startTimer: () => setIsRunning(true),
    stopTimer: () => setIsRunning(false),
    // isRunning
  };
};

export default GamePage;
