import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import { WebAudioContextProvider } from './contexts/Audio/Audio';
import { createGlobalStyle } from 'styled-components';
import theme from './constants/theme';

const GlobalStyle = createGlobalStyle`
  html,body{
    padding: 0;
    margin: 0;
    color: ${theme.textColor}
  }
  body {
    background-color: ${theme.backgroundColor};
    width: 100vw;
    height: 100vh;
  }
`;

const App = () => (
  <WebAudioContextProvider>
    <Main />
    <GlobalStyle />
  </WebAudioContextProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
