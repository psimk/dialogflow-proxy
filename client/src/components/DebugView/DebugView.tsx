import React, { useContext } from 'react';
import { useToggle } from 'react-use';
import { Button, Text, DropDownIcon, Container } from './styled';
import { WebAudioContext } from '../../contexts/Audio';
import Visualizer from '../Visualizer';

export default () => {
  const [ audioState ] = useContext(WebAudioContext);
  const [ isDebugVisible, toggleDebugView ] = useToggle(false);

  const toggle = () => toggleDebugView(!isDebugVisible);

  return (
    <React.Fragment>
      <Button onClick={toggle}>
        <Text>
          DEBUG
          <DropDownIcon />
        </Text>
      </Button>

      {isDebugVisible && (
        <Container>
          {audioState.analyser && <Visualizer analyser={audioState.analyser} />}
        </Container>
      )}
    </React.Fragment>
  );
};
