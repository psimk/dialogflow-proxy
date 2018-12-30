import * as utils from '../utils';

interface IRecorderOptions {
  bufferSize: number;
  pushToSpeakers?: boolean;
}

const defaultRecorderOptions: IRecorderOptions = {
  bufferSize: 1024,
  pushToSpeakers: false,
};

export default class Recorder {
  private _context: AudioContext;
  private _analyser: AnalyserNode;
  private processor: ScriptProcessorNode;

  private micStream: MediaStream | undefined;
  private micSource: MediaStreamAudioSourceNode | undefined;
  private isEnabled: boolean;
  private options: IRecorderOptions;

  constructor(options: IRecorderOptions = defaultRecorderOptions) {
    this._context = new AudioContext();
    this._analyser = this._context.createAnalyser();
    this.processor = this._context.createScriptProcessor(options.bufferSize, 1, 1);
    this.options = options;
    this.isEnabled = false;
  }

  async init(options?: MediaTrackConstraintSet) {
    if (this._context.state === 'suspended') {
      console.log('Please interact with the document');

      await utils.awaitableGlobalInteractionLister(async () => {
        await this._context.resume();

        console.log('Audio Context resumed');
      });
    }

    this.micStream = await utils.createMicStream(options);

    if (this.micStream) {
      this.micSource = this._context.createMediaStreamSource(this.micStream);

      this.micSource.connect(this.processor);
      this.micSource.connect(this._analyser);
      this.processor.connect(this._context.destination);

      if (this.options.pushToSpeakers) {
        this.micSource.connect(this._context.destination);
      }
    }
  }

  public stop() {
    // if (this.micSource) {
    //   this.micSource.();
    // }
  }

  public get analyser(): AnalyserNode {
    return this._analyser;
  }

  public get context(): AudioContext {
    return this._context;
  }

  public set onAudioData(onBuffer: (floatArray: Float32Array) => void) {
    this.processor.onaudioprocess = (event) => {
      if (this.isEnabled) onBuffer(event.inputBuffer.getChannelData(0));
    };
  }

  public set enabled(isEnabled: boolean) {
    this.isEnabled = isEnabled;
  }

  public destroy() {}
}
