import next from 'next';

import io from 'socket.io';
import http from 'http';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handler = app.getRequestHandler();
const port = 3000;

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    handler(req, res);
  });

  server.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
  });
  const sio = io(server);

  sio.on('connect', (socket) => {
    socket.on('board-update', (todos) => {
      socket.broadcast.emit('board-update', todos);
    });
  });
});
