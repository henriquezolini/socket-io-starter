const io = require("socket.io-client");
const { delay } = require("./utils");
const { SERVER_HOST, SERVER_PORT } = require("./config");

const socket = io(`http://${SERVER_HOST}:${SERVER_PORT}`);

async function sendMessages() {
  for (let index = 0; index <= 10; index++) {
    socket.emit("socket.message", {
      x: Math.random(),
      y: Math.random(),
      clientID: index
    });
    console.log("[GENERATOR] Emit => Cordinate sended to client " + index + ".");
    await delay(100);
  }
}

setInterval(() => {
  sendMessages();
}, 3000);
