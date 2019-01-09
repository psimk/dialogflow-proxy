import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import { createGlobalStyle } from 'styled-components';
import theme from './constants/theme';

const GlobalStyle = createGlobalStyle`
  html,body{
    padding: 0;
    margin: 0;
    color: ${theme.textColor}
  }
  body, #root {
    background-color: ${theme.backgroundColor};
    width: 100vw;
    height: 100vh;
  }
`;

const App = () => (
  <Fragment>
    <Main />
    <GlobalStyle />
  </Fragment>
);

ReactDOM.render(<App />, document.getElementById('root'));
