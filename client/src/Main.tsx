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
  const [ response, setResponse ] = useState<any>({});
  console.log('Main: render');

  useEffect(() => {
    voice.init();
  });

  useEffect(
    () => {
      const { intent } = response;
      if (!intent) return;

      // @ts-ignore: TS7071
      const foundIntent = intents[String(intent)] as IIntent;

      console.log(foundIntent.inputContext);
      console.log(foundIntent.outputContext);
    },
    [ response ],
  );

  const onClick = async () => {
    const response = await voice.listen();

    setResponse(response);
  };

  return (
    <React.Fragment>
      <DebugView analyser={voice.analyser} />
      <Container>
        <Button onClick={onClick}>Speech Recognition</Button>
        {response.transcript && <Text>{response.transcript}</Text>}
        {response.intent && <Text>Intent: {response.intent}</Text>}
      </Container>
    </React.Fragment>
  );
};
