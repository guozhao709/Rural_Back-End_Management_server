import express from "express";
import chatStream from "../../tools/userAIchat.js";

const router = express.Router();

router.post("/AIchat", async (req, res) => {
  // 设置响应头，支持SSE流式传输
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
});
