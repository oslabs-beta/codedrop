import axios from 'axios';

export const prettierCode = async (codeToFormat, callback = null) => {
  const formattedCode = await axios
    .post(
      '/api/prettier',
      { codeString: codeToFormat },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  if (callback) {
    return callback(formattedCode.data.code);
  }
  return formattedCode;
};
