import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AlignHorizontalLeftIcon from '@material-ui/icons/AlignHorizontalLeft';
import AlignHorizontalCenterIcon from '@material-ui/icons/AlignHorizontalCenter';
import AlignHorizontalRightIcon from '@material-ui/icons/AlignHorizontalRight';

import Editor from './Editor';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '365px',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function StylingTabs({ component, components, addComponent }) {
  const { containerStyle = '', style = '' } = component;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCreateNewStyleChange = (newStyleString) => {
    let arr = containerStyle.split('\n');
    const result = [];
    for (const i of arr) {
      const item = i.split(':')[0];
      if (newStyleString.includes(item)) continue;
      else result.push(i);
    }
    return result.join('\r') + newStyleString;
  };

  const handleConatinerStyleUpdate = ({ e, newStyleString }) => {
    const updatedComponent = {
      variables: {
        component: {
          ...component,
          containerStyle: e ? e : handleCreateNewStyleChange(newStyleString),
        },
      },
    };
    addComponent(updatedComponent);
  };

  const handleComponentStyleUpdate = (e) => {
    const updatedComponent = {
      variables: {
        component: {
          ...component,
          style: e,
        }
      },
    };
    addComponent(updatedComponent);
  };

  const flexDefaults = `\ndisplay: flex;\nflex-direction: column;`;
  const leftAlignStyle = `${flexDefaults}\nalign-items: flex-start;`;
  const centerAlignStyle = `${flexDefaults}\nalign-items: center;`;
  const rightAlignStyle = `${flexDefaults}\nalign-items: flex-end;`;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Easy" {...a11yProps(0)} />
          <Tab label="Component CSS" {...a11yProps(1)} />
          <Tab label="Container CSS" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <AlignHorizontalLeftIcon
          onClick={() => handleConatinerStyleUpdate({ newStyleString: leftAlignStyle })}
        />
        <AlignHorizontalCenterIcon
          onClick={() => handleConatinerStyleUpdate({ newStyleString: centerAlignStyle })}
        />
        <AlignHorizontalRightIcon
          onClick={() => handleConatinerStyleUpdate({ newStyleString: rightAlignStyle })}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Editor
          language="css"
          displayName="CSS"
          value={style}
          onChange={handleComponentStyleUpdate}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Editor
          language="css"
          displayName="CSS"
          value={containerStyle}
          onChange={(e) => handleConatinerStyleUpdate({ e })}
        />
      </TabPanel>
    </div>
  );
}
