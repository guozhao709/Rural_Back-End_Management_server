import express from "express";
import { writeAdmin } from "../../utils/storage.js";
import { readAdmin } from "../../utils/storage.js";
import { getAdminToken } from "../../utils/jwt.js";
import { generateAdminId } from "../../utils/id.js";

const router = express.Router();

// 注册接口, 接收一个json字符串
router.post("/register", async (req, res) => {
  const admin = req.body;
  const admins = await readAdmin();
  const adminID = generateAdminId(admins, admin.role);
  admin.adminID = adminID;
  if (await writeAdmin(admin)) {
    res.send("success");
  } else {
    res.send("error");
  }
});

// 登录接口, 接收一个json字符串
router.post("/login", async (req, res) => {
  const { adminname, password } = req.body;
  const adminArr = await readAdmin();
  const admin = adminArr.find((item) => item.adminname === adminname);
  if (admin) {
    if (admin.password === password) {
      const adminToken = getAdminToken(admin);
      res.send({
        admin,
        adminToken,
      });
    } else {
      res.send("password error");
    }
  } else {
    res.send("admin not found");
  }
});

export default router;
