import React, { useEffect, useState } from 'react';
import DebugView from './components/DebugView';
import styled from 'styled-components';
import { Button, Text } from './components/General';
import intents, { IIntent } from './Voice/config/intents';
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

export default () => {
  console.log('Main: render');

  const onClick = async () => {
    const intent = await voice.listen();

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
