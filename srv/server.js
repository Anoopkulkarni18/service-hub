import mongoose from "mongoose";
import app from "./app.js";
import { config } from "dotenv";

config();
const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Listening to PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
