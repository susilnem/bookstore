import express from "express";
import connection from "./models/index.js";
import bookRoute from "./routes/bookRoute.js";
import "dotenv/config";
import cors from "cors"; //this is for the anyone can access the api
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//for making the link of image to treat as a path not a url
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("banckend is working");
});

app.use("/book", bookRoute);

app.listen(process.env.PORT || 8000, async () => {
  console.log("server is started");
  try {
    await connection.authenticate();
    connection.sync();
    console.log("successfully connected to db");
  } catch (err) {
    console.error("Error during connection to database:", err);
  }
});
