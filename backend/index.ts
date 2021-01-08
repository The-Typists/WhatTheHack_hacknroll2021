import express from "express";
import cors from "cors";
import connect from "./src/db/connect";
import bodyParser from "body-parser";

import { profileRouter } from "./src/routes/profileRouter";
import { usersRouter } from "./src/routes/userRouter";
import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "./src/game";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
connect();
app.use(express.json());
app.get("/", (req, res) => res.send("Hellooo world"));
app.use("/users", usersRouter);
app.use("/profile", profileRouter);

server.listen(PORT);

const io = new Server(server, {
  cors: {
    origin: "*",
    allowedHeaders: "*",
  },
});

socketHandler(io);

server.on("listening", () => {
  console.log(`Server running on ${PORT}`);
});
