import styled from 'styled-components';
import theme from '../../constants/theme';
import { MdArrowDropDown } from 'react-icons/md';
import { Button } from '../General';

export const Container = styled.div`
  background-color: ${theme.accentBackgroundColor};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${theme.accentBackgroundColor};
  z-index: 1;
`;

export const DropDownIcon = styled(MdArrowDropDown)`
  margin-left: 5px;
`;

export const AbsoluteButton = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
`;
