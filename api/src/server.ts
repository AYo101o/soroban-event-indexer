import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import { eventsRouter } from "./routes/events";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

app.use("/events", eventsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

export default app;