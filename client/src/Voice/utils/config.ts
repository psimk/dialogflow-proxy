export enum LanguageCodes {
  enUS = 'en',
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

export interface IStreamConfig {
  session: string;
  queryParams: {
    session: string;
    contexts: [] | { name: string; lifespanCount: number }[];
  };
  queryInput: {
    singleUtterance?: boolean;
    audioConfig?: {
      audioEncoding?: AudioEncoding;
      sampleRateHertz?: number;
      languageCode?: LanguageCodes;
    };
  };
}

export interface IStreamConfigParams {
  sessionId: string;
  context: string;
}

const PROJECT_ID = 'thuum-5fd63';

export default {
  createStreamConfig: ({ sessionId, context }: IStreamConfigParams): IStreamConfig => {
    const sessionPath = `projects/${PROJECT_ID}/agent/sessions/${sessionId}`;
    const contextPath = `${sessionPath}/contexts/${context}`;

    const contexts = context
      ? [
          {
            name: contextPath,
            lifespanCount: 1,
          },
        ]
      : [];

    return {
      session: sessionPath,
      queryParams: {
        session: sessionPath,
        contexts,
      },
      queryInput: {
        singleUtterance: true,
        audioConfig: {
          audioEncoding: AudioEncoding.Linear16,
          sampleRateHertz: 41000,
          languageCode: LanguageCodes.enUS,
        },
      },
    };
  },
};
