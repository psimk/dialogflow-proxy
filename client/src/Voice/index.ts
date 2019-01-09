import Recorder from './models/Recorder';
import Sockets from './models/Sockets';
import nanoid from 'nanoid';
import intents, { IIntent } from './config/intents';

interface IResponse {
  transcript?: string;
  intent?: string;
}

export default class Voice {
  private recorder: Recorder;
  private socket: Sockets;
  private intent: IIntent | undefined;
  private context: string;
  private sessionId: string;

  constructor() {
    this.recorder = new Recorder();
    this.socket = new Sockets();
    this.context = '';
    this.sessionId = nanoid();

    this.socket.onMessage = (message: MessageEvent) => {
      const response = JSON.parse(message.data) as IResponse;

      if (!response.intent) return;
      this.recorder.enabled = false;

      // @ts-ignore: TS7071
      const intent = intents[String(response.intent)] as IIntent;

      this.context = intent.outputContext;
    };

    this.recorder.onAudioData = floatArray => this.socket.sendBuffer(floatArray);
    this.recorder.init();
  }

  public async listen(): Promise<IIntent> {
    this.socket.sendStart({ sessionId: this.sessionId, context: this.context });

    this.recorder.enabled = true;
    let interval: any;

    return new Promise(resolve => {
      const checker = () => {
        if (!this.intent) return;
        clearInterval(interval);

        const intent = { ...this.intent };
        this.intent = undefined;

        resolve(intent);
      };

      interval = setInterval(checker, 0);
    });
  }

  public get analyser(): AnalyserNode {
    return this.recorder.analyser;
  }
}
