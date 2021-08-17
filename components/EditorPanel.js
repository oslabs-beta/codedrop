import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

import { greyScheme } from './util/colorPallete'

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

export default function EditorPanel({ component, components, setComponents, setShowEditor }) {
  const classes = useStyles();
  const { value } = component;

  return (
    <div className={classes.editorBar}>
      <div className={classes.editorBarHeader}>
        <h3>Editor Panel</h3>
        <CloseIcon onClick={() => setShowEditor(null)} />
      </div>
      <div className={classes.editorBarInput}>
        <h4>Value</h4>
        <Input
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
        />
        <h4>Styling</h4>
        <StylingTabs component={component} components={components} setComponents={setComponents} />
      </div>
    </div>
  );
}
