import React from 'react';
import DebugView from './components/DebugView';
import styled from 'styled-components';
import { Button } from './components/General';
import Voice from './Voice';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const voice = new Voice();
const voice2 = new Voice();

export default () => {
  console.log('Main: render');

  const onClick = async () => {
    const intent = await Promise.all([ voice.listen(), voice2.listen() ]);
    // const intent = await voice.listen();

    console.log(intent);
  };

  return (
    <React.Fragment>
      <DebugView analyser={voice.analyser} />
      <Container>
        <Button onClick={onClick}>Speech Recognition</Button>
      </Container>
    </React.Fragment>
  );
};
