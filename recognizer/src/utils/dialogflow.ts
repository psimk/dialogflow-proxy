import { join } from 'path';
import * as secret from '../../clientSecret.json';

export default {
  getClientSecretPath: () => join(__dirname, '..', '..', './clientSecret.json'),
  PROJECT_ID: secret.project_id,
};
