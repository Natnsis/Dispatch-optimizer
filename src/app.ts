import express from "express";
import adminAuthRoutes from "./routes/adminAuth";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/admin", adminAuthRoutes);

export default app;