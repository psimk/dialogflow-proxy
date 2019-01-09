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
  const [ expectedContext, setExpectedContext ] = useState<string>('');
  console.log('Main: render');

  const onClick = async () => {
    const response = await voice.listen();

    // @ts-ignore: TS7071
    const intent = intents[String(response.intent)] as IIntent;

    console.log(intent, response);

    if (!intent) return;

    console.log(intent.inputContext === expectedContext);

    setExpectedContext(intent.outputContext);
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
