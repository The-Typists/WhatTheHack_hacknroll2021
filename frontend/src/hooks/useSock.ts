import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | undefined = io("/");

export const useSock = () => {
  return socket;
};
