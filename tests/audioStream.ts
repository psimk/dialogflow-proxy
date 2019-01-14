import * as WebSocket from 'ws';
import { IStreamConfig } from '../src/types';
import { createReadStream } from 'fs';
import { join } from 'path';

const PROJECT_ID = 'thuum-5fd63';
const AUDIO_FILE = join(__dirname, './testAudio.raw');

const ws = new WebSocket('ws://localhost:8080');
ws.binaryType = 'arraybuffer';

const config: IStreamConfig = {
  projectId: PROJECT_ID,
  languageCode: 'en-US',
  sampleRateHertz: 441000,
  context: '',
};

ws.onopen = () => {
  ws.onmessage = (message: any) => {
    const data = JSON.parse(message.data);
    if (data.intent) execute();
  };

  const execute = () => {
    const fileStream = createReadStream(AUDIO_FILE);

    ws.send(JSON.stringify({ command: 'start', payload: config }));

    fileStream.on('data', chunk => {
      ws.send(chunk);
    });

    fileStream.on('end', () => {
      console.log('END');
    });
  };

  execute();
};
