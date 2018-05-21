import { socket } from './index';

const handleSocketConnections = (socket: socket.Socket) => {

  console.log('user connected');
  
  socket.on('historyForExtension', (data) => {
    console.log(data);
    socket.emit('graphData', data);
  });

  socket.on('ext', (data) => {
    console.log(data);
  })
}

export {
  handleSocketConnections
}