import styled from 'styled-components';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

if (typeof navigator !== 'undefined') {
  require('codemirror/mode/xml/xml');
  require('codemirror/mode/css/css');
  require('codemirror/mode/javascript/javascript');
}

const EditorContainer = styled.div`
  height: 50vh;
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
`;


export default function Editor({ language, onChange, value, readOnly = false }) {
  const handleChange = (editor, data, value) => onChange(value);

  return (
    <EditorContainer>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true,
          readOnly: readOnly,
        }}
      />
    </EditorContainer>
  );
}
