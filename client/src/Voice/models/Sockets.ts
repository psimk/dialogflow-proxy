import { converter, config } from '../utils';
import { IStreamConfigParams } from '../utils/config';

interface IOptions {
  port?: number;
}

export enum Command {
  Start,
  Stop,
}

const defaultPort = 6060;
const defaultOrigin = '172.17.60.177';

export default class Sockets {
  private ws: WebSocket;
  private url: string;

  constructor(options: IOptions = {}) {
    this.url = `ws://${defaultOrigin}:${options.port || defaultPort}`;
    this.ws = new WebSocket(this.url);

    this.init();
  }

  private init(): void {
    this.ws.binaryType = 'arraybuffer';

    this.ws.onopen = () => {
      console.log(`Connection to ${this.url} has been established`);
    };
    this.ws.onmessage = message => console.log(JSON.parse(message.data));

    this.ws.onerror = err => {
      console.log(`Connection error to ${this.url} has occurred`);
      console.error(err);

      this.close();
    };

    this.ws.onclose = () => {
      console.log('Connection Closed');

      setTimeout(() => {
        this.ws = new WebSocket(this.url);

        console.log(`Attempting to reconnect to ${this.url}`);
        this.init();
      }, 2000);
    };
  }

  private send(message: string | ArrayBuffer) {
    if (this.isOpen) {
      this.ws.send(message);
    }
  }

  public sendStart(streamConfig: IStreamConfigParams) {
    const payload = config.createStreamConfig(streamConfig);
    const command = Command.Start;

    this.send(JSON.stringify({ payload, command }));
  }

  public sendStop() {
    const command = Command.Stop;

    this.send(JSON.stringify({ command }));
  }

  public sendMessage(message: string) {
    this.send(message);
  }

  public sendBuffer(floatArray: Float32Array) {
    this.send(converter.float32ToInt16(floatArray));
  }

  public close() {
    this.ws.close();
  }

  public get isOpen(): boolean {
    return this.ws.readyState === WebSocket.OPEN;
  }

  public set onMessage(onMessage: (message: MessageEvent) => void) {
    this.ws.onmessage = onMessage;
  }
}
