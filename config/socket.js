const socket = io => {
  io.on("connection", socket => {
    console.log(`connection established by: ${socket.id}`);

    socket.on("setup", id => {
      socket.join(id);
      socket.emit("connected");
      console.log(id);
    });
    socket.on("join chat", room => {
      socket.join(room);
      console.log("user join " + room);
    });

    socket.on("send message", (message, users, room, sender) => {
      socket.join(message);
      console.log("user join " + room);
      socket.in(room).emit("message", message);
      users.forEach(user => {
        if (user == sender) return;

        socket.in(user._id).emit("message recieved");
      });
    });
  });
};

module.exports = socket;
