import mongoose from "mongoose";

export default function connect() {
  const uri = `mongodb+srv://hacknroll:${process.env.MONGO_PASSWORD}@cluster0.txbzk.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  mongoose.connection.on("connected", function () {
    console.log("Backend successfully connected to MongoDB");
  });
  mongoose.connection.on("error", function () {
    console.log("Error connecting to MongoDB");
  });
}
