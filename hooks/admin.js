import authRoutes from "../routes/admin/auth.js";
import administratorRoutes from "../routes/admin/function/administrator.js";
import { authMiddleware } from "../utils/jwt.js";

const adminRouter = (app) => {
  // 管理员注册和登录路由
  app.use("/admin/auth", authRoutes);

  // 侧栏功能路由
  // 1. 管理员管理路由
  app.use("/admin/administrator", authMiddleware, administratorRoutes);
};

export default adminRouter;