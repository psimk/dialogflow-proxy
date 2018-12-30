import { join } from 'path';
import { IStreamPreConfig, AudioEncoding, LanguageCodes } from '../types';
import AudioStreamer from '../AudioStreamer';
import * as secret from '../../clientSecret.json';

const PROJECT_ID = secret.project_id;

const defaultInitialStreamRequestConfig = {
  queryParams: {},
  queryInput: {
    audioConfig: {
      audioEncoding: AudioEncoding.Linear16,
      sampleRateHertz: 41000,
      languageCode: LanguageCodes.enUS,
    },
    singleUtterance: true,
  },
};

export default {
  createInitialStreamRequestConfig: ({
    sessionId,
    singleUtterance,
    audioConfig,
  }: IStreamPreConfig) => {
    const sessionPath = `projects/${PROJECT_ID}/agent/sessions/${sessionId}`;

    return {
      session: sessionPath,
      queryParams: {
        ...defaultInitialStreamRequestConfig.queryParams,
        session: sessionPath,
      },
      queryInput: {
        ...defaultInitialStreamRequestConfig.queryInput,
        singleUtterance,
        audioConfig: {
          ...defaultInitialStreamRequestConfig.queryInput.audioConfig,
          ...audioConfig,
        },
      },
    };
  },
  getClientSecretPath: () => join(__dirname, '..', '..', './clientSecret.json'),
  PROJECT_ID,
};
