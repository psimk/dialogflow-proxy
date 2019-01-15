export enum Command {
  Start = 'start',
  Stop = 'stop',
}

export interface IStreamRequest {
  session: string;
  queryParams: {
    session: string;
    contexts: Array<{ name: string; lifespanCount: number }>;
  };
  queryInput: {
    singleUtterance?: boolean;
    audioConfig: {
      audioEncoding: string;
      sampleRateHertz: number;
      languageCode: string;
    };
  };
}

export interface IStreamConfig {
  sessionId?: string;
  projectId: string;
  context: string;
  languageCode: string;
  sampleRateHertz: number;
}
