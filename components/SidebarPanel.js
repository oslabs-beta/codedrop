import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { genearteReactCodeString } from '../components/api/genearteReactCodeString';
import CodeDrawer from './CodeDrawer';
import SideBarItem from './dnd/SideBarItem';
import { SIDEBAR_ITEMS } from './dnd/constants';
import { greyScheme } from './util/colorPallete';

import { genearteAndReturnFormattedCode } from '../pages/home';

const useStyles = makeStyles({
  sideBar: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    width: '250px',
    padding: '10px',
    borderRight: `1px solid ${greyScheme.lighterGray}`,
  },
});

const SidebarPanel = ({ previewMode, setPreviewMode, components, layout }) => {
  const classes = useStyles();
  const [codeString, setCodeString] = useState(``);

  useEffect(() => {
    genearteReactCodeString({
      components,
      layout,
      callback: setCodeString,
    });
  }, []);

  return (
    <div className={classes.sideBar}>
      {Object.values(SIDEBAR_ITEMS).map((sideBarItem) => (
        <SideBarItem key={sideBarItem.id} data={sideBarItem} />
      ))}
      <FormControlLabel
        control={
          <Switch
            checked={previewMode}
            onChange={() => setPreviewMode(!previewMode)}
            name="previewMode"
            color="primary"
          />
        }
        label="Preview"
      />
      <CodeDrawer 
        codeString={codeString}
        layout={layout}
      />
    </div>
  );
};

export default SidebarPanel;
