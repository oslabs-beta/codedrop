import { useState, Fragment } from 'react';
import { genearteReactCodeString } from '../components/api/genearteReactCodeString';

import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CodeIcon from '@material-ui/icons/Code';

import Editor from './Editor';
import ReactIcon from './util/Icons/ReactIcon';
// import AngularIcon from './util/Icons/AngularIcon';

export default function CodeDrawer({ layout, components }) {
  const [showCode, setShowCode] = useState(false);
  const [codeString, setCodeString] = useState(``);

  const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    margin: 0,
  };
  
  const drawerDirection = 'bottom';

  const frameworks = [{ name: 'React', icon: <ReactIcon /> }, { name: 'Angular', icon: <ReactIcon /> }];

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    genearteReactCodeString({
      components,
      layout,
      callback: setCodeString,
    });
    setShowCode(!showCode);
  };

  const box = {
    height: '645px',
  };

  const list = (anchor) => (
    <Box role="presentation" style={box}>
      <List style={flexContainer}>
        {frameworks.map((framework, index) => (
          <ListItem button key={framework.name}>
            {framework.icon}
            <ListItemText primary={framework.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Editor
        language="js"
        displayName="React"
        value={codeString}
        readOnly={true}
        height={box.height}
      />
    </Box>
  );

  return (
    <Fragment key={drawerDirection}>
      <Button onClick={toggleDrawer} variant="contained" color="secondary" startIcon={<CodeIcon />}>
        View Code
      </Button>
      <Drawer anchor={drawerDirection} open={showCode} onClose={toggleDrawer}>
        {list(drawerDirection)}
      </Drawer>
    </Fragment>
  );
}
