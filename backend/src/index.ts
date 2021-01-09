import express from "express";
import cors from "cors";
import connect from "./db/connect";
import bodyParser from "body-parser";
import path from "path";
import { profileRouter } from "./routes/profileRouter";
import { usersRouter } from "./routes/userRouter";
import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "./game";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
connect();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/profile", profileRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

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
