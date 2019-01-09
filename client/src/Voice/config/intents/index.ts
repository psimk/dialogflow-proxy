// GENERATED FILE, DO NOT EDIT
import start from './start.json';
import introduction_yes from './introduction_yes.json';
import introduction_no from './introduction_no.json';

export default {
  start,
  introduction_no,
  introduction_yes,
};

export interface IIntent {
  events: string[];

  phrases: { [language: string]: string[] };
  responses: { [language: string]: string[] };
  parameters: any[];
  priority: string;
  inputContext: string;
  outputContext: string;
}
