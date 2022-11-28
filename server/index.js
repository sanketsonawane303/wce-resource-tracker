import "./connections/config.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectToMongoDb from "./connections/mongodb.js";
import api from "./routes/api.js";

connectToMongoDb();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("WCE-RESOURCE-TRACKER"));

app.use("/api", api);

app.use("*", (req, res) => res.send("Invalid route"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`WCE-RESOURCE-TRACKER Server is running on port ${PORT}.`);
});
