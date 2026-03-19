import userAuthRoutes from "../routes/client/userAuth.js";
import {authMiddleware} from "../tools/userJwt.js"
import userAIchatRoutes from "../routes/client/userAIchatWeb.js";

const userRouter = (app) => {
  // 用户注册和登录路由
  app.use("/user/auth", userAuthRoutes);

  // 用户AI聊天路由
  app.use("/user/AIchat", authMiddleware, userAIchatRoutes);
};

export default userRouter;