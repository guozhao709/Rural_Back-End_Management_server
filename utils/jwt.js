import jwt from "jsonwebtoken";

// 密钥
const secret_key = "guozhao";

// 生成管理员的token
export const getAdminToken = (admin) => {
  const {adminname, phone } = admin;
  const token = jwt.sign({adminname, phone }, secret_key, {
    expiresIn: "2h",
  });
  return token;
};

// token中间件验证
export const authMiddleware = (req, res, next) =>{
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).send({msg: "未登录"});
    }
    const token = auth.split(" ")[1];
    try {
        const payload = jwt.verify(token, secret_key);
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).send({ msg: "token 无效", error });
    }
}
