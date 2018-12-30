import * as WebSocket from 'ws';
import AudioStreamer from './AudioStreamer';
import handlers from './handlers';

const debug = true;
const PORT = 6060;
const server = new WebSocket.Server({ port: PORT });

console.log(`WS server listening on port ${server.options.port}`);

server.on('connection', (ws, req) => {
  console.log(`Connection from: ${req.connection.remoteAddress}`);

  const streamer = new AudioStreamer(
    {
      onMessage: handlers.sender(ws, debug),
      onError: console.error,
    },
    debug,
  );

  ws.on('message', handlers.receiver(streamer, debug));
});
