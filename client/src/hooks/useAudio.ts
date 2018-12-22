import { useContext } from 'react';
import { WebAudioContext, ACTIONS } from '../contexts/Audio';
import { awaitableGlobalInteractionLister, createRecorder } from '../utils';

export default async () => {
  const [ audioState, dispatch ] = useContext(WebAudioContext);
  let { context, recorder, analyser } = audioState;

  if (!context) context = new AudioContext();
  if (!recorder) recorder = await createRecorder(context);
  if (!analyser) {
    analyser = context.createAnalyser();
    recorder!.connect(analyser);
  }

  if (context.state === 'suspended') {
    console.log('Please interact with the document');
    await awaitableGlobalInteractionLister(async () => {
      await context!.resume();
      console.log('Audio Context resumed');
    });
  }

  if (!audioState.recorder || !audioState.context || !audioState.analyser) {
    dispatch({
      type: ACTIONS.SetState,
      payload: { context, recorder, analyser },
    });
  }
};
