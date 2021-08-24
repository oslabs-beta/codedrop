import { useState, Fragment } from 'react';
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
import { generateCode } from '../pages/home'

export default function CodeDrawer({ codeString, layout, components }) {
  const [showCode, setShowCode] = useState(false);
  const drawerDirection = 'bottom';

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setShowCode(!showCode);
    codeString = generateCode()
    console.log('codeString ', codeString)
  };

  // const getGeneratedCode = () => {
  //   console.log('getGeneratedCode ')

  // }
  
  const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    margin: 0,
  };

  const box = {
    height: '345px',
  };

  const list = (anchor) => (
    <Box role="presentation" style={box}>
      <List style={flexContainer}>
        {['React'].map((text, index) => (
          <ListItem button key={text}>
            <ReactIcon />
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Editor language="js" displayName="React" value={codeString} readOnly={true} />
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
