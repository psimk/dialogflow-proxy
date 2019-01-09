import * as WebSocket from 'ws';
import AudioStreamer from './AudioStreamer';
import * as config from '../config/general.json';
import handlers from './handlers';

const server = new WebSocket.Server({ port: config.wsPort });

console.log(`WS server listening on port ${server.options.port}`);

server.on('connection', (ws, req) => {
  console.log(`Connection from: ${req.connection.remoteAddress}`);

  const handlerCreator = handlers({ debug: config.debug });

  const streamer = new AudioStreamer(
    {
      onMessage: handlerCreator.sender(ws),
      onError: console.error,
    },
    config.debug,
  );
  ws.on('message', handlerCreator.receiver(streamer));
});
