const io = require("socket.io-client");
const winston = require("winston");
const { SERVER_HOST, SERVER_PORT } = require("./config");

const socket = io(`http://${SERVER_HOST}:${SERVER_PORT}`);

const clientID = 5;

logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: `./src/logs/clients/client-${clientID}.log` })
  ]
});

socket.on("connect", () => {
  console.log("[SOCKET] A new connection has been stablished.");
  socket.emit("socket.identify", { id: clientID });
});

socket.on("socket.message", (data) => {
  logger.info(JSON.stringify(data));
  console.log("[SOCKET] socket.message => ", data);
});
