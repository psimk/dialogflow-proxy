import * as WebSocket from 'ws';
import AudioStreamer from './AudioStreamer';
import * as config from '../config/general.json';
import { Command } from './types';
import nanoid = require('nanoid');

const server = new WebSocket.Server({ port: config.wsPort });

console.log(`WS server listening on port ${server.options.port}`);

server.on('connection', (ws, req) => {
  console.log(`Connection from: ${req.connection.remoteAddress}`);

  const streamer = new AudioStreamer(
    {
      onMessage: sender(ws),
      onError: console.error,
    },
    nanoid(),
    config.debug,
  );
  ws.on('message', receiver(streamer));
});

const sender = (ws: WebSocket) => (message: any) => {
  const formattedMessage = formatMessage(message);

  ws.send(JSON.stringify(formattedMessage), console.error);

  if (config.debug) console.log(formattedMessage);
};
const receiver = (streamer: AudioStreamer) => (message: WebSocket.Data) => {
  if (typeof message !== 'string') {
    streamer.write(message as Buffer);
    return;
  }

  const { command, payload } = JSON.parse(message);

  if (command !== undefined && command === Command.Start) {
    streamer.start(payload);
    return;
  }

  if (command !== undefined && command === Command.Stop) {
    streamer.stop();
    return;
  }
};

interface IResultMessage {
  intent?: string;
  transcript?: string;
}

const formatMessage = ({ queryResult, recognitionResult }: any): IResultMessage | {} => {
  if (queryResult) {
    return {
      transcript: queryResult.queryText,
      intent: queryResult.intent ? queryResult.intent.displayName : '',
    };
  }

  if (recognitionResult) {
    return {
      transcript: recognitionResult.transcript,
    };
  }

  return {};
};
