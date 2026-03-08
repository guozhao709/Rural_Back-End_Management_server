import express from "express";

import { readAdmin } from "../../../utils/storage.js";
import { writeAllAdmin } from "../../../utils/storage.js";

const router = express.Router();

// 返回管理员的全部信息
router.get("/list", async (req, res) => {
  const adminArr = await readAdmin();
  res.json(adminArr);
});

// 删除管理员
router.post("/delAdmin", async(req, res)=>{
    const {adminID} = req.body;
    const adminArr = await readAdmin();
    const index = adminArr.findIndex((item) => item.adminID === adminID);

    if(index === -1){
        return res.status(404).json({
            code: 404,
            message: "管理员不存在",
            data: null,
          });
    }

    adminArr.splice(index, 1);
    await writeAllAdmin(adminArr);
    res.json({
        code: 200,
        message: "删除成功",
        data: null,
      });
})

// 更新管理员
router.post("/updateAdmin", async(req, res)=>{
  console.log(req.body);
  
    const {adminID, adminname, password, phone, role} = req.body;
    const adminArr = await readAdmin();
    const index = adminArr.findIndex((item) => item.adminID === adminID);

    if(index === -1){
        return res.status(404).json({
            code: 404,
            message: "管理员不存在",
            data: null,
          });
    }

    adminArr[index].adminname = adminname;
    adminArr[index].password = password;
    adminArr[index].phone = phone;
    adminArr[index].role = role;

    await writeAllAdmin(adminArr);
    res.json({
        code: 200,
        message: "更新成功",
        data: null,
      });
})



export default router;
