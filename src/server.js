const Koa = require("koa");
const http = require("http");
const socket = require("socket.io");
const winston = require("winston");
const { getByValue } = require("./utils");
const { SERVER_HOST, SERVER_PORT } = require("./config");

const app = new Koa();
const server = http.createServer(app.callback());
const websocket = socket(server);

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "./src/logs/server/server.log" })]
});

let sequenceNumberByClient = new Map();

websocket.on("connection", (socket) => {
  console.log(`[SOCKET] Connection => Server has a new connection [id=${socket.id}].`);

  socket.on("socket.identify", (data) => {
    sequenceNumberByClient.set(socket.id, data.id);
  });

  socket.on("socket.message", (data) => {
    logger.info(JSON.stringify(data));
    var client = getByValue(sequenceNumberByClient, data.clientID);
    if (typeof client !== "undefined") {
      // is connected
      websocket.to(client).emit("socket.message", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("[SOCKET] Disconnect => A connection was disconnected");
    sequenceNumberByClient.delete(socket.id);
  });
});

server.listen(SERVER_PORT, () => {
  console.log(`[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`);
});
