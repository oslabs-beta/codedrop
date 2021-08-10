import CloseIcon from '@material-ui/icons/Close';

import Editor from '../components/Editor';

export default function EditorPanel({ component, components, setComponents }) {
  const { value, style } = component;

  return (
    <div className="editorBar">
      <div className="editorBarHeader">
        <p>Editor Panel</p>
        <CloseIcon onClick={() => setShowEditor(null)} />
      </div>
      <div className="editorBarInput">
        <span>Value</span>
        <input
          value={value}
          onChange={(e) => {
            setComponents({
              ...components,
              [component.id]: {
                ...component,
                value: e.target.value,
              },
            });
          }}
        ></input>
      </div>
      <Editor
        language="css"
        displayName="CSS"
        value={style}
        onChange={(e) => {
          setComponents({
            ...components,
            [component.id]: {
              ...component,
              style: e,
            },
          });
        }}
      />
    </div>
  );
}
