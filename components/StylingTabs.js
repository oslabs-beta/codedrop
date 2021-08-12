import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

export default function StylingTabs({ component, components, setComponents }) {
  const { containerStyle, style } = component;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <div>Cool features coming soon!</div>
      </TabPanel>
      <TabPanel value={value} index={1}>
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
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Editor
          language="css"
          displayName="CSS"
          value={containerStyle}
          onChange={(e) => {
            setComponents({
              ...components,
              [component.id]: {
                ...component,
                containerStyle: e,
              },
            });
          }}
        />
      </TabPanel>
    </div>
  );
}
