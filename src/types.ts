export enum Command {
  Start = 'start',
  Stop = 'stop',
}

export enum AudioEncoding {
  Unspecified = 'AUDIO_ENCODING_UNSPECIFIED',
  Linear16 = 'AUDIO_ENCODING_LINEAR_16',
  Flac = 'AUDIO_ENCODING_FLAC',
  Mulaw = 'AUDIO_ENCODING_MULAW',
  AMR = 'AUDIO_ENCODING_AMR',
  AMR_WB = 'AUDIO_ENCODING_AMR_WB',
  OGG = 'AUDIO_ENCODING_OGG_OPUS',
  SPEEX = 'AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE',
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
