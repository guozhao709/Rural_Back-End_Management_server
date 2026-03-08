import db from "../db/index.js";

 const createUsersDB = () => {
    // 创建用户表
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT UNIQUE NOT NULL,     
  password TEXT NOT NULL,         
  name TEXT,
  gender INTEGER DEFAULT 0,        
  birthday DATE,                   
  address TEXT,
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP
)`,
  ).run();
};

export default createUsersDB;
