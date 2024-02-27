import express from "express";
import router from "./routes/registery.js";
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.use("/srv", router);
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({ msg: error.message });
});

export default app;
