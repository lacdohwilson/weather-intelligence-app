process.on("uncaughtException", (err) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...", { err });
  process.exit(1);
});

import app from "./app.js";
import logger from "./utils/logger.js";

const port = process.env.PORT || 9000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});

process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...", { err });
  server.close(() => {
    process.exit(1);
  });
});
