module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('enter groups', (groups) => {
      for (let g of groups){
        socket.join(g._id);
        console.log('joined ' + g._id);
      }
      console.log("");
    });
    socket.on('enter group', (group) => {
      socket.join(group.id);
      io.sockets.in(group.id).emit('enter group', group);
      console.log("add group", group.id);
    });
    socket.on('leave group', (data) => {
      io.sockets.in(data.id).emit('leave group', data);
      // socket.leave(data.id);
      console.log('left ' + JSON.stringify(data));
    });
    socket.on('new message', (data) => {
      console.log('new message', data);
      io.sockets.in(data.groupId).emit('refresh logs', data);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};