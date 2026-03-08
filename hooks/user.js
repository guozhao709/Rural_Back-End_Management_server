import userAuthRoutes from "../routes/client/userAuth.js";

const userRouter = (app) => {
  // 用户注册和登录路由
  app.use("/user/auth", userAuthRoutes);
};

export default userRouter;