import socketio from "socket.io";

const SocketIO = async (server) => {
  try {
    const io = socketio(server);
    io.on("connection", (socket) => {
      console.log("a user connected");
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
    return io;
  } catch (error) {
    console.log(`socket.io error ${error}`);
    return null;
  }
};

module.exports = SocketIO;
