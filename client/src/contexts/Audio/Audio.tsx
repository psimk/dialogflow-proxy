import React, { createContext, useReducer } from 'react';
import { AudioState, AudioDispatch, initialState } from './state';
import reducer from './reducer';

export const WebAudioContext = createContext<[AudioState, AudioDispatch]>([
  initialState,
  () => {},
]);

interface IProviderProps {
  children: React.ReactNode;
}

export const WebAudioContextProvider = ({ children }: IProviderProps) => (
  <WebAudioContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </WebAudioContext.Provider>
);
