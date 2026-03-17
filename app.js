import express from "express";
import adminRouter from "./hooks/admin.js";
import userRouter from "./hooks/user.js";
import cors from "cors";
import createUsersDB from "./tools/createDB.js";

createUsersDB();


const app = express();

app.use(cors({
  origin:[
    'http://127.0.0.1:8080', // B端
    'http://127.0.0.1:8081' , // C端
    'http://127.0.0.1:5500'
  ], // 前端地址
  credentials: true, // 如果需要传递 cookie，必须开启
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的请求方法
  allowedHeaders: ['Content-Type', 'Authorization'] // 允许的请求头
}))


// 用来解析 json文件
app.use(express.json())


// 管理员路由
adminRouter(app);
// 用户路由
userRouter(app);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
