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
      console.log(arg)
      const { roomId } = arg;
      const joinId = roomId ? roomId : "000xx";
      socket.broadcast.to(joinId).emit("cast", { ...arg});
    });
    socket.on("create-room", (uuid) => {
      console.log(`create room with id:${uuid}`);
    });
    socket.on("join-room", (userInfo) => {
      //创建房间
      const { roomId } = userInfo;
      const joinId = roomId ? roomId : "000xx";
      socket.join(joinId);
      socket.to(joinId).emit("user-join", {
        ...userInfo,
        time: new Date().toLocaleTimeString(),
        type: "enterTip",
      });
    });
  });

  httpServer.listen(PORT);
};
