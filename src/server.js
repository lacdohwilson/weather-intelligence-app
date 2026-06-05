process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err);
  process.exit(1);
});

import app from "./app.js";

const port = process.env.PORT || 9000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLER REJECTION! 💥 Shutting down...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
