import express from "express";
import connect from "src/db/connect";

connect();

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 8080;

app.get("/", (req, res) => res.send("Hellooo world"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
