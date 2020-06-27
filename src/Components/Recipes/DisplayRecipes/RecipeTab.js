import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DisplayAllRecipe from './DisplayAllRecipe';
import DisplayUntaggedRecipe from './DisplayUntaggedRecipe';
import DisplayDisabledRecipe from './DisplayDisabledRecipe';
import DisplayIncorrectRecipe from './DisplayIncorrectRecipe';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{padding:'initial'}}>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appbar: {
    color: '#000',
    backgroundColor: 'aliceblue',
    width: 'fit-content',
    padding:'initial'
  },
  tabpanel:{
    // borderRadius:'25px',
    position:'relative',
  //   -webkit-border-top-left-radius: '15px',
  // -webkit-border-top-right-radius: '15px',
  // -moz-border-radius-topleft: '15px',
  // -moz-border-radius-topright: '15px',
  borderTopLeftRadius: '15px',
  borderTopRightRadius: '15px',
  '&:active':{
    zIndex:3
  }
  },
}));

export default function RecipeTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab className={classes.tabpanel} label="All Recipes(s)" {...a11yProps(0)} />
          <Tab label="Incorrect" {...a11yProps(1)} />
          <Tab label="Untagged" {...a11yProps(2)} />
          <Tab label="Disabled" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
          <DisplayAllRecipe />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DisplayIncorrectRecipe />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DisplayUntaggedRecipe />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DisplayDisabledRecipe />
      </TabPanel>
    </div>
  );
}