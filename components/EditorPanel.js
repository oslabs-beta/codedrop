import CloseIcon from '@material-ui/icons/Close';

import StylingTabs from './StylingTabs'

export default function EditorPanel({ component, components, setComponents, setShowEditor }) {
  const { value } = component;

  return (
    <div className="editorBar">
      <div className="editorBarHeader">
        <h3>Editor Panel</h3>
        <CloseIcon onClick={() => setShowEditor(null)} />
      </div>
      <div className="editorBarInput">
        <h4>Value</h4>
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
      <h4>Styling</h4>
      <StylingTabs component={component} components={components} setComponents={setComponents} />
    </div>
  );
}
