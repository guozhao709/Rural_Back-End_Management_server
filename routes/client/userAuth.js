import express from "express";
import { userRegister, userLogin } from "../../tools/userStorage.js";
import { getUserToken } from "../../tools/userJwt.js";



const router = express.Router();

// 注册接口
router.post("/register", (req, res) => {
    const user = req.body;
    const backData = userRegister(user);
    if(backData.success){
        res.json({
            success: true,
            message: "注册成功",
        });
    }else{
        res.json({
            success: false,
            message: backData.message,
        });
    }
});

// 登录接口
router.post("/login", (req, res) => {
    
    const loginInfo = req.body;
    console.log('loginInfo', loginInfo);
    
    const backData = userLogin(loginInfo);
    if(backData.success){

        // 生成token
        const token = getUserToken(loginInfo);
        if(!token){
            return res.status(500).json({
                success: false,
                message: "生成token失败",
            });
        }

        res.json({
            success: true,
            message: "登录成功",
            token,
            userInfo: backData.user,
        });
    }else{
        res.json({
            success: false,
            message: backData.message,
        });
    }
});

export default router;

