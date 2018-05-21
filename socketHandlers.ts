import { socket } from './index';

const handleSocketConnections = (socket: socket.Socket) => {

  console.log('user connected');

  socket.on('historyForExtension', (data) => {
    console.log(data);
    setTimeout(() => socket.emit('graphData', 'hello heres a graph'), 1000);
  });

  socket.on('ext', (data) => {
    console.log(data);
  })
}

export {
  handleSocketConnections
}