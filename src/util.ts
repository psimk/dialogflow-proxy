import { join } from 'path';
import * as config from '../config/general.json';
import { IStreamConfig, IStreamRequest } from './types';

export default {
  getClientSecretPath: () => join(__dirname, '..', '..', './clientSecret.json'),
  createInitialStreamRequest: ({
    sessionId,
    context,
    projectId,
    sampleRateHertz,
    languageCode,
  }: IStreamConfig): IStreamRequest => {
    const sessionPath = `projects/${projectId}/agent/sessions/${sessionId}`;
    const contextPath = `${sessionPath}/contexts/${context}`;

    const contexts = context
      ? [
          {
            name: contextPath,
            lifespanCount: config.contextLifeSpan,
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
        singleUtterance: config.singleUtterance,
        audioConfig: {
          languageCode,
          sampleRateHertz,
          audioEncoding: config.audioEncoding,
        },
      },
    };
  },
};
