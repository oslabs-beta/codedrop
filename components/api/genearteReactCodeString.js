import axios from 'axios';

export const genearteReactCodeString = async ({ components, layout, framework, callback = null, projectName}) => {
  const formattedCode = await axios
    .post(
      '/api/genearteReactCodeString',
      { components, layout, framework, projectName},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  if (callback) return callback(formattedCode.data.code);
  return formattedCode;
};