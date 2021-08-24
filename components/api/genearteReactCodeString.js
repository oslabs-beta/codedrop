import axios from 'axios';

export const genearteReactCodeString = async ({ components, layout, callback = null}) => {
  const formattedCode = await axios
    .post(
      'http://localhost:3000/api/genearteReactCodeString',
      { components, layout },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((body) => body.data.code);
  if (callback) return callback(formattedCode);
  return formattedCode;
};
