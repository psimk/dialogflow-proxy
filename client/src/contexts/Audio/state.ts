export const initialState = {
  context: null,
  recorder: null,
  analyser: null,
};

export enum ACTIONS {
  SetState = 'set_state',
}

export type AudioState = {
  context: null | AudioContext;
  recorder: null | MediaStreamAudioSourceNode;
  analyser: null | AnalyserNode;
};
export type AudioAction = { payload?: any; type: ACTIONS };
export type AudioDispatch = ((action: AudioAction) => void) | (() => {});
