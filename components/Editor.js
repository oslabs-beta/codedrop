import styled from 'styled-components';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

if (typeof navigator !== 'undefined') {
  require('codemirror/mode/xml/xml');
  require('codemirror/mode/css/css');
  require('codemirror/mode/javascript/javascript');
}

export default function Editor({ displayName, language, onChange, value }) {
  const handleChange = (editor, data, value) => onChange(value);

  const EditorContainer = styled.div`
    height: 50vh;
    flex-grow: 1;
    flex-basis: 0;
    display: flex;
    flex-direction: column;
  `;

  const EditorTitle = styled.div`
    display: flex;
    justify-content: space-between;
    padding: .5rem .0rem .5rem .0rem;
  `;

  return (
    <EditorContainer>
      <EditorTitle>{displayName}</EditorTitle>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true,
        }}
      />
    </EditorContainer>
  );
}
