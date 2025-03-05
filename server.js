const express = require("express");
const schedule = require("node-schedule");

const app = express();
const PORT = 3000;

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Hello, Node.js Server with Scheduler!");
});

// 매 분 0초마다 실행되는 작업 (예: 로그 출력)
schedule.scheduleJob("0 * * * * *", () => {
  console.log(`스케줄 실행됨: ${new Date().toLocaleString()}`);
});

// 매일 오전 9시에 실행되는 작업
schedule.scheduleJob("0 9 * * *", () => {
  console.log("매일 오전 9시에 실행되는 작업");
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중`);
});
