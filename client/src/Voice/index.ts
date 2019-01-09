import Recorder from './models/Recorder';
import Sockets from './models/Sockets';
import nanoid from 'nanoid';

interface IResponse {
  transcript?: string;
  intent?: string;
}

export default class Voice {
  private recorder: Recorder;
  private socket: Sockets;
  private response: IResponse | null;

  constructor() {
    this.recorder = new Recorder();
    this.socket = new Sockets();
    this.response = null;
  }

  public async init(): Promise<void> {
    await this.recorder.init();

    const onOpen = () => {
      this.socket.onMessage = (message: MessageEvent) => {
        this.response = JSON.parse(message.data) as IResponse;

        if (this.response.intent) this.recorder.enabled = false;
      };

      this.recorder.onAudioData = (floatArray) => this.socket.sendBuffer(floatArray);
    };

    if (this.socket.isOpen) onOpen();
    else this.socket.onOpen = onOpen;
  }

  public async listen(): Promise<IResponse | null> {
    this.socket.sendStart(nanoid());

    this.recorder.enabled = true;
    let interval: NodeJS.Timeout;

    return new Promise((resolve) => {
      const checker = () => {
        if (this.response) {
          clearInterval(interval);

          const response = { ...this.response };
          this.response = null;

          resolve(response);
        }
      };

      interval = setInterval(checker, 0);
    });
  }

  public get analyser(): AnalyserNode {
    return this.recorder.analyser;
  }
}
