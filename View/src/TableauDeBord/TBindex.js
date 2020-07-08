import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Maintenance from './Maintenance/TBMaintenance'
import Flotte from './Flotte/TBFlotte'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
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
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    background : '#2196f3',
    color : 'white' 
  },
  tabStyle: {
    backgroundColor: '#2196f3',
    color : 'white',
    margin : 'none'
  }
}));

export default function MaintenanceNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" classes={classes.appBar}>
        <Tabs
            TabIndicatorProps={{style: {background:'white'}}}
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
            className={classes.tabStyle}
        >
          <LinkTab label="Maintenance" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Flotte" href="/trash" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Maintenance/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Flotte/>
      </TabPanel>
    </div>
  );
}
