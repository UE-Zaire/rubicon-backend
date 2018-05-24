import { socket } from './index';

const handleSocketConnections = (socket: socket.Socket) => {

  console.log('user connected');
  
  socket.on('historyForExtension', (data) => {
    socket.broadcast.emit('historyForExtension', data);
  });

  socket.on('ext', (data) => {
    console.log({ext: data});
  })
}

export {
  handleSocketConnections
}