import mongoose from "mongoose";

export default function connect() {
  const uri = `mongodb://${process.env.MONGO_HOST}/database`;
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
