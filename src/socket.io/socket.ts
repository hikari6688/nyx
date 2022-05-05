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
    socket.on("chat", (arg) => {
      socket.broadcast.emit("cast", { ...arg, id: socket.id });
    });
    socket.on("create-room", (uuid) => {
      console.log(`create room with id:${uuid}`);
    });
    socket.join(socket.id);
    socket.on("join-room", (userInfo) => {
      //创建房间
      console.log(userInfo);
      const { roomId } = userInfo;
      socket.to(roomId).emit("user-join", userInfo);
    });
  });

  httpServer.listen(PORT);
};
