import React, { useContext } from 'react';
import { WebAudioContext } from './contexts/Audio';
import useAudio from './hooks/useAudio';
import DebugView from './components/DebugView';

export default () => {
  useAudio();

  const [ audioState, dispatch ] = useContext(WebAudioContext);

  return (
    <React.Fragment>
      <DebugView />
    </React.Fragment>
  );
};
