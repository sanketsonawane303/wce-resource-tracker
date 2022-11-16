import mongoose from "mongoose";
const url = process.env.MONGO_DB_DEV;

const connectToMongoDb = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongodb connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
export default connectToMongoDb;
