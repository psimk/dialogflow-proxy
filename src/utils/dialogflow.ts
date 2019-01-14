import { join } from 'path';
import { IStreamConfig, IStreamRequest } from '../types';

const AudioEncoding = 'AUDIO_ENCODING_LINEAR_16';

export default {
  getClientSecretPath: () => join(__dirname, '..', '..', './clientSecret.json'),
  createInitialStreamRequest: ({
    sessionId,
    context,
    projectId,
    languageCode,
  }: IStreamConfig): IStreamRequest => {
    const sessionPath = `projects/${projectId}/agent/sessions/${sessionId}`;
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
        contexts,
        session: sessionPath,
      },
      queryInput: {
        singleUtterance: true,
        audioConfig: {
          languageCode,
          audioEncoding: AudioEncoding,
          sampleRateHertz: 41000,
        },
      },
    };
  },
};
