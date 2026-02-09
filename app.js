import express from "express";
import authRoutes from "./routes/admin/auth.js";
import { authMiddleware } from "./utils/jwt.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:8080', // 前端地址
  credentials: true, // 如果需要传递 cookie，必须开启
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的请求方法
  allowedHeaders: ['Content-Type', 'Authorization'] // 允许的请求头
}))

// 用来解析 json文件
app.use(express.json())

app.use("/admin/auth", authRoutes);

app.get("/", authMiddleware, (req, res) => {
  res.send("Hello, World!");
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
