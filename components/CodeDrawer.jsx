import { useState, Fragment } from 'react';
import { genearteReactCodeString } from '../components/api/genearteReactCodeString';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import CodeIcon from '@material-ui/icons/Code';
import { FaAngular } from 'react-icons/fa';

import Editor from './Editor';
import ReactIcon from './util/Icons/ReactIcon';

export default function CodeDrawer({ layout, components }) {
  const [showCode, setShowCode] = useState(false);
  const [codeString, setCodeString] = useState(``);
  const [currentFrameworkTab, setCurrentFrameworkTab] = useState(0);

  const handleChangeTabs = () => setCurrentFrameworkTab(currentFrameworkTab === 0 ? 1 : 0);

  const box = { height: '645px' };

  const drawerDirection = 'bottom';

  const frameworks = [
    { name: 'React', icon: <ReactIcon /> },
    { name: 'Angular', icon: <FaAngular /> },
  ];

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    genearteReactCodeString({
      components,
      layout,
      framework: 'React',
      callback: setCodeString,
    });
    setShowCode(!showCode);
  };

  const selectFrameworkType = (frameworkName) => {
    genearteReactCodeString({
      components,
      layout,
      framework: frameworkName,
      callback: setCodeString,
    });
  };

  return (
    <Fragment key={drawerDirection}>
      <Button onClick={toggleDrawer} variant="contained" color="secondary" startIcon={<CodeIcon />}>
        View Code
      </Button>
      <Drawer anchor={drawerDirection} open={showCode} onClose={toggleDrawer}>
        <Box role="presentation" style={box}>
          <Tabs
            value={currentFrameworkTab}
            onChange={handleChangeTabs}
            aria-label="select framework tab"
          >
            {frameworks.map((framework, index) => (
              <Tab
                key={index}
                icon={framework.icon}
                label={framework.name}
                onClick={(e) => selectFrameworkType(framework.name)}
              />
            ))}
          </Tabs>
          <Divider />
          <Editor
            language="js"
            displayName="React"
            value={codeString}
            readOnly={true}
            height={box.height}
          />
        </Box>
      </Drawer>
    </Fragment>
  );
}
