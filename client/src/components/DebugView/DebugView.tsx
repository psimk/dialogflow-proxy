import React from 'react';
import { useToggle } from 'react-use';
import { AbsoluteButton, DropDownIcon, Container } from './styled';
import Visualizer from '../Visualizer';
import { Text } from '../General';

interface IProps {
  analyser: AnalyserNode;
}

export default ({ analyser }: IProps) => {
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
          <Visualizer analyser={analyser} />
        </Container>
      )}
    </React.Fragment>
  );
};
