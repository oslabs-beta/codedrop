import axios from 'axios';

export const prettierCode = async (codeToFormat, callback = null) => {
  const formattedCode = await axios
    .post(
      'http://localhost:3000/api/prettier',
      { codeString: codeToFormat },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((body) => body.data.code);
  if (callback) {
    console.log('callback ', callback)
    return callback(formattedCode);
  }
  return formattedCode;
};
