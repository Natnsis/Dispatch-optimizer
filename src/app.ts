import express from "express";
import adminAuthRoutes from "./routes/adminAuth";
import adminUsersRoutes from "./routes/adminUsers";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/admin", adminAuthRoutes);
app.use("/admin/users", adminUsersRoutes);

export default app;