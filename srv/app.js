import express from "express";
import router from "./routes/registery.js";
const app = express();
app.use(express.json());
app.use("/srv", router);
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.statusCode || 500).json({ msg: error.message });
});

export default app;
