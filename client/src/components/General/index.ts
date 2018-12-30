import styled from 'styled-components';
import theme from '../../constants/theme';

export const Button = styled.button`
  margin: 1px;
  padding: 5px 10px;
  border: 1px solid #fff;
  outline: none;
  background-color: ${theme.backgroundColor};
  font-size: 14px;
  color: ${theme.textColor};
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: ${theme.hoverBackgroundColor};
    color: ${theme.hoverTextColor};
  }
`;

export const Text = styled.p`
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;
