import * as WebSocket from 'ws';
import AudioStreamer from './AudioStreamer';
import { Command } from './types';

type TSender = (message: any) => void;
type TDataHandler = (message: WebSocket.Data) => void;

interface IResultMessage {
  intent?: string;
  transcript?: string;
}

interface IHandlerOptions {
  debug?: boolean;
}

const parseMessage = ({ queryResult, recognitionResult }: any): IResultMessage | {} => {
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

export default ({ debug }: IHandlerOptions = {}) => {
  let debugMessage = '';

  return {
    receiver: (streamer: AudioStreamer): TDataHandler => (message) => {
      if (debug) {
        if (typeof message === 'string') {
          debugMessage = message;

          console.log(`Receiver: ${debugMessage}`);
        } else if (debugMessage !== 'Streaming audio buffers') {
          debugMessage = 'Streaming audio buffers';

          console.log(`Receiver: ${debugMessage}`);
        }
      }

      if (typeof message === 'string') {
        const { command, payload } = JSON.parse(message);

        if (command !== undefined && command === Command.Start) {
          streamer.start(payload);
        }

        if (command !== undefined && command === Command.Stop) {
          streamer.stop();
        }

        return;
      }

      streamer.write(message as Buffer);
    },

    sender: (ws: WebSocket): TSender => (message) => {
      const parsedMessage = parseMessage(message);

      ws.send(JSON.stringify(parsedMessage), console.error);

      if (debug) console.log(`Sender: ${JSON.stringify(parsedMessage, null, 2)}`);
    },
  };
};
