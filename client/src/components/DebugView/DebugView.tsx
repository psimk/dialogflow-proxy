import React, { useContext } from 'react';
import { useToggle } from 'react-use';
import { AbsoluteButton, DropDownIcon, Container } from './styled';
import Visualizer from '../Visualizer';
import Recorder from '../../models/Recorder';
import { Text } from '../General';

interface IProps {
  recorder: Recorder;
}

export default ({ recorder }: IProps) => {
  const [ isDebugVisible, toggleDebugView ] = useToggle(false);

  const toggle = () => toggleDebugView(!isDebugVisible);

  return (
    <React.Fragment>
      <AbsoluteButton onClick={toggle}>
        <Text>
          DEBUG
          <DropDownIcon />
        </Text>
      </AbsoluteButton>

      {isDebugVisible && (
        <Container>
          <Visualizer analyser={recorder.analyser} />
        </Container>
      )}
    </React.Fragment>
  );
};
