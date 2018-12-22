export const jsonPrettify = (object: any) => JSON.stringify(object, null, 2);

export const objectToString = (object: any): string => {
  let returnString = '';

  Object.keys(object).forEach((key) => {
    const newObj = { val: object[key], type: object[key] ? object[key].constructor : object[key] };

    returnString += jsonPrettify({ [key]: newObj });
    returnString += '\n';
  });

  return `{\n${returnString}\n}`;
};

export default {
  state: (state: any) => console.log(`Current State: ${objectToString(state)}`),

  action: ({ payload, type }: any) =>
    console.log(`Action: ${type}, payload: ${objectToString(payload)}`),
};
