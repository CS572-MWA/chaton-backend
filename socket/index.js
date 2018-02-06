const Log = require('../models/log');

module.exports = function (io) {
  user_map = {}
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
      if (group){
        socket.join(group.id);
        io.sockets.emit('enter group', group);
        console.log("add group", group.id);
      }
    });
    socket.on('leave group', (data) => {
      if (data){
        io.sockets.in(data.id).emit('leave group', data);
        console.log('left ' + JSON.stringify(data));
      }
    });
    socket.on('new message', (data) => {
      if (data){
        console.log('new message', data);
        Log.create({ groupId: data.groupId, user: data.userId, content: data.message}, (err, data) =>{
          // console.log("log save process: ", err, data);
        });
        io.sockets.in(data.groupId).emit('refresh logs', data);
      }
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};