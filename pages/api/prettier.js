export default function prettier(req, res) {
  const prettier = require('prettier');
  try {
    const { codeString } = req.body;
    const formattedCode = prettier.format(codeString, { parser: 'babel' });
    res.status(200).json({ code: formattedCode });
  } catch (e) {
    console.log('prettier api error: ', e);
    res.status(500).send(e);
  }
}
