import express from "express";
import adminAuthRoutes from "./routes/adminAuth";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/admin", adminAuthRoutes);

export default app;