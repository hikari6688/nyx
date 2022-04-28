import { createServer } from "http";
import { Server } from "socket.io";
export const connectSocket = () => {
  const PORT = 9001;
  const httpServer = createServer();
  const io = new Server(httpServer, {
    // options
    cors: {
      origin: "*",
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(
      `socket.in is running in ${PORT},whith clintId:${
        socket.id
      } at ${new Date().toLocaleString()}`
    );
    socket.emit("hello", "world");
    socket.on("chat", (arg) => {
      console.log(arg);
      socket.broadcast.emit("cast", { ...arg, id: socket.id });
    });
  });

  httpServer.listen(PORT);
};
