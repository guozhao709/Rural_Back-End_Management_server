import db from "../db/index.js";

// 用户注册存储
export const userRegister = (user) => {
  const { phone, password, name, gender, birthday, address } = user;

  // 1. 预编译语句（性能更好，且能防止 SQL 注入）
  const stmt = db.prepare(
    "INSERT INTO users (phone, password, name, gender, birthday, address) VALUES (?, ?, ?, ?, ?, ?)",
  );

  try {
    // 2. 执行插入
    const info = stmt.run(phone, password, name, gender, birthday, address);

    // 3. 返回成功结果和新生成的 ID
    return {
      success: true,
      userId: info.lastInsertRowid,
      changes: info.changes,
    };
  } catch (error) {
    // 4. 特殊处理：手机号重复错误
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        success: false,
        message: "该手机号已被注册",
      };
    }

    // 5. 其他未知错误
    console.error("数据库写入失败:", error.message);
    return {
      success: false,
      message: "注册失败，请稍后再试",
    };
  }
};

// 用户登录查询
export const userLogin = (user) => {
  const { phone, password } = user;

  // 1. 预编译语句（性能更好，且能防止 SQL 注入）
  const stmt = db.prepare(
    "SELECT * FROM users WHERE phone = ? AND password = ?",
  );

  try {
    // 2. 执行查询
    const user = stmt.get(phone, password);

    // 3. 返回成功结果和用户信息
    return {
      success: true,
      user,
    };
  } catch (error) {

    // 4. 其他未知错误
    console.error("数据库写入失败:", error.message);
    return {
      success: false,
      message: "登录失败, 手机号或密码错误",
    };
  }
};
