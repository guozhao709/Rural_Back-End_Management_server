import express from "express";
import authRoutes from "./routes/admin/auth.js";
import { authMiddleware } from "./utils/jwt.js";

const app = express();

// 用来解析 json文件
app.use(express.json())

app.use("/admin/auth", authRoutes);

app.get("/", authMiddleware, (req, res) => {
  res.send("Hello, World!");
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
