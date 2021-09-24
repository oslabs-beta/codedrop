import { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import Input from '@material-ui/core/Input';

import { greyScheme } from './util/colorPallete';

import StylingTabs from './StylingTabs';

const useStyles = makeStyles({
  editorBar: {
    borderLeft: `1px solid`,
    borderColor: greyScheme.lighterGray,
  },
  editorFormContainer: {
    padding: '10px',
  },
  editorBarHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: greyScheme.lighterGray,
    alignItems: 'center',
    padding: '1px 10px',
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%)',
  },
  editorBarInput: {
    display: 'flex',
    flexDirection: 'column',
    padding: '5px 10px',
  },
});

export default function EditorPanel({ component, setShowEditor, addComponent }) {
  const classes = useStyles();
  const { __typename, ...otherComponentProps } = component;
  const [id, setId] = useState(component.id);
  const [value, setValue] = useState(component.value);
  const [style, setStyle] = useState(component.style);
  const [containerStyle, setContainerStyle] = useState(component.containerStyle);

  useEffect(() => {
    if (component.id !== id) {
      setId(component.id);
      setValue(component.value);
      setStyle(component.style);
      setContainerStyle(component.containerStyle);
    } else if (
      value !== component.value ||
      style !== component.style ||
      containerStyle !== component.containerStyle
    ) {
      const updatedComponent = {
        ...otherComponentProps,
        value: value,
        style: style,
        containerStyle: containerStyle,
      };
      console.log('updatedComponent', updatedComponent);
      const timeOutId = setTimeout(
        () => addComponent({ variables: { component: updatedComponent } }),
        500
      );
      return () => clearTimeout(timeOutId);
    }
  }, [containerStyle, component, style, value]);

  return (
    <div className={classes.editorBar}>
      <div className={classes.editorBarHeader}>
        <h3>Editor Panel</h3>
        <CloseIcon onClick={() => setShowEditor(null)} />
      </div>
      <div className={classes.editorBarInput}>
        <h4>Value</h4>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <h4>Styling</h4>
        <StylingTabs
          style={style}
          setStyle={setStyle}
          containerStyle={containerStyle}
          setContainerStyle={setContainerStyle}
        />
      </div>
    </div>
  );
}
