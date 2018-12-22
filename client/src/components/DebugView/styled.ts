import styled from 'styled-components';
import theme from '../../constants/theme';
import { MdArrowDropDown } from 'react-icons/md';

export const Container = styled.div`
  display: flex;
  background-color: ${theme.accentBackgroundColor};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;
export const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;
export const DropDownIcon = styled(MdArrowDropDown)`
  margin-left: 5px;
`;

export const Button = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  margin: 1px;
  padding: 5px 10px;
  border: 1px solid #fff;
  outline: none;
  background-color: ${theme.backgroundColor};
  font-size: 14px;
  color: ${theme.textColor};
`;
