import express from "express";
import { writeAdmin } from "../../utils/storage.js";
import { readAdmin } from "../../utils/storage.js";
import { getAdminToken } from "../../utils/jwt.js";
import { generateAdminId } from "../../utils/id.js";

const router = express.Router();

// 注册接口, 接收一个json字符串
router.post("/register", async (req, res) => {
  try {
    // 参数验证
    const admin = req.body;
    if (!admin || !admin.adminname || !admin.password || !admin.role) {
      return res.status(400).json({
        code: 400,
        message: "缺少必要参数: adminname、password 和 role 不能为空",
        data: null,
      });
    }

    // 读取管理员数据
    const admins = await readAdmin();
    if (!Array.isArray(admins)) {
      return res.status(500).json({
        code: 500,
        message: "读取管理员数据失败",
        data: null,
      });
    }

    // 检查管理员是否已存在
    const existingAdmin = admins.find(
      (item) => item.adminname === admin.adminname,
    );
    if (existingAdmin) {
      return res.status(409).json({
        code: 409,
        message: "管理员名称已存在",
        data: null,
      });
    }

    // 生成管理员ID
    const adminID = generateAdminId(admins, admin.role);
    if (!adminID) {
      return res.status(500).json({
        code: 500,
        message: "生成管理员ID失败",
        data: null,
      });
    }

    admin.adminID = adminID;

    // 写入管理员数据
    const success = await writeAdmin(admin);
    if (success) {
      return res.status(201).json({
        code: 201,
        message: "注册成功",
        data: {
          adminID,
        },
      });
    } else {
      return res.status(500).json({
        code: 500,
        message: "注册失败，请重试",
        data: null,
      });
    }
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({
      code: 500,
      message: "服务器内部错误",
      data: null,
    });
  }
});

// 登录接口, 接收一个json字符串
router.post("/login", async (req, res) => {
  try {
    // 参数验证
    const { adminname, password } = req.body;
    if (!adminname || !password) {
      return res.status(400).json({
        code: 400,
        message: "缺少必要参数: adminname 和 password 不能为空",
        data: null,
      });
    }

    // 读取管理员数据
    const adminArr = await readAdmin();
    if (!Array.isArray(adminArr)) {
      return res.status(500).json({
        code: 500,
        message: "读取管理员数据失败",
        data: null,
      });
    }

    // 查找管理员
    const admin = adminArr.find((item) => item.adminname === adminname);
    if (!admin) {
      return res.status(401).json({
        code: 401,
        message: "管理员不存在",
        data: null,
      });
    }

    // 验证密码
    if (admin.password !== password) {
      return res.status(401).json({
        code: 401,
        message: "密码错误",
        data: null,
      });
    }

    // 生成 token
    const adminToken = getAdminToken(admin);
    if (!adminToken) {
      return res.status(500).json({
        code: 500,
        message: "生成令牌失败",
        data: null,
      });
    }

    // 成功响应
    res.status(200).json({
      code: 200,
      message: "登录成功",
      data: {
        admin,
        adminToken,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      code: 500,
      message: "服务器内部错误",
      data: null,
    });
  }
});

export default router;
