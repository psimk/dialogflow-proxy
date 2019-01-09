import React, { useEffect, useState } from 'react';
import nanoid from 'nanoid';
import DebugView from './components/DebugView';
import Recorder from './models/Recorder';
import Sockets from './models/Sockets';
import styled from 'styled-components';
import { Button, Text } from './components/General';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

interface IResponse {
  transcript?: string;
  intent?: string;
}

const recorder = new Recorder();
let socket: Sockets;

export default () => {
  const [ response, setResponse ] = useState<IResponse>({});
  console.log('Main: render');

  useEffect(() => {
    recorder.init().then(() => {
      socket = new Sockets();

      socket.onOpen = () => {
        socket.onMessage = (message: MessageEvent) => {
          const response = JSON.parse(message.data) as IResponse;

          setResponse(response);

          if (response.intent) recorder.enabled = false;
        };

        recorder.onAudioData = (floatArray) => socket.sendBuffer(floatArray);
      };
    });

    return () => {
      recorder.destroy();
    };
  }, []);

  const onClick = () => {
    socket.sendStart(nanoid());
    recorder.enabled = true;
  };

  return (
    <React.Fragment>
      <DebugView recorder={recorder} />
      <Container>
        <Button onClick={onClick}>Speech Recognition</Button>
        {response.transcript && <Text>{response.transcript}</Text>}
        {response.intent && <Text>Intent: {response.intent}</Text>}
      </Container>
    </React.Fragment>
  );
};
