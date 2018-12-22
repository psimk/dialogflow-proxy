import { AudioState, AudioAction, ACTIONS } from './state';
import { print } from '../../utils';

export default (state: AudioState, { payload, type }: AudioAction): AudioState => {
  print.state(state);
  print.action({ payload, type });

  if (type === ACTIONS.SetState) return { ...state, ...payload };
  return state;
};
