import express from "express";
import connect from "src/db/connect";
import bodyParser from "body-parser";
import { usersRouter } from "src/routes/userRouter";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT ? process.env.PORT : 8080;

connect();
app.use(express.json());
app.get("/", (req, res) => res.send("Hellooo world"));
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
