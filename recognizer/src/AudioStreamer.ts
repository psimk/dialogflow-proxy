import { SessionsClient } from 'dialogflow';
import { ReadStream, WriteStream, createWriteStream } from 'fs';
import { IStreamPreConfig } from './types';
import utils from './utils';

interface IAudioStreamerHandlers {
  onMessage: (() => {}) | any;
  onError: (() => {}) | any;
}

const DEBUG_FILE = 'debug.raw';

const enum EVENTS {
  Error = 'error',
  Data = 'data',
}

export default class AudioStreamer {
  static PROJECT_ID = 'thuum-5fd63';

  private session: string = '';
  private hasEnded: boolean = false;
  private stream: (WriteStream & ReadStream) | null = null;
  private fileStream: WriteStream | null = null;

  private client: SessionsClient;
  private debug: boolean;
  private handlers: IAudioStreamerHandlers;

  constructor(handlers: IAudioStreamerHandlers, debug: boolean = false) {
    this.client = new SessionsClient({
      projectId: AudioStreamer.PROJECT_ID,
      keyFilename: utils.getClientSecretPath(),
    });

    this.handlers = handlers;
    this.debug = debug;
  }

  private checkResult(data: any) {
    if (!this.hasEnded) {
      if (data && data.recognitionResult && data.recognitionResult.isFinal) this.stop();
    }
  }

  public start(config: IStreamPreConfig) {
    // @ts-ignore
    const stream = this.client.streamingDetectIntent() as WriteStream & ReadStream;
    const initialStreamConfig = utils.createInitialStreamRequestConfig(config);

    stream
      .on(EVENTS.Error, this.handlers.onError)
      .on(EVENTS.Data, this.handlers.onMessage)
      .on(EVENTS.Data, (data: any) => this.checkResult(data));

    stream.write(initialStreamConfig);

    this.session = config.sessionId;
    this.stream = stream;

    this.hasEnded = false;

    if (this.debug) {
      console.log(`AudioStreamer: Started for ${this.session}`);
      console.log(initialStreamConfig);

      this.fileStream = createWriteStream(DEBUG_FILE);
    }
  }

  public write(inputAudio: Buffer) {
    if (this.hasEnded) return;

    if (this.stream) this.stream.write({ inputAudio });
    if (this.fileStream) this.fileStream.write(inputAudio);
  }

  public stop() {
    this.hasEnded = true;

    if (this.stream) {
      this.stream.end();
      this.stream = null;
    }

    if (this.fileStream) {
      this.fileStream.end();
      this.fileStream = null;
    }

    if (this.debug) {
      console.log(`AudioStreamer: Stopped for ${this.session}`);
    }
  }
}
