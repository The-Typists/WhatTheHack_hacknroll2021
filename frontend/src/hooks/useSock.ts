import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
export const useSock = () => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    if (!socket) {
      setSocket(io("/"));
    }
  }, []);

  return socket;
};
