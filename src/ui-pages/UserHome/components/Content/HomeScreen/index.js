import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import RestoreIcon from '@material-ui/icons/Restore';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TodayIcon from '@material-ui/icons/Today';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { useHistory } from "react-router";
const useStyles = makeStyles({
  root: {
    width: 360,
    position:"fixed",
    top: "auto", background: "#eeeeee", bottom: 0 
  },
});

export default function LabelBottomNavigation(props) {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Home" value="recents" icon={<HomeIcon />} />
      <BottomNavigationAction label="Chat" value="favorites" icon={<ChatOutlinedIcon />} 
      onClick={()=>history.push("/user-home/user-screen/chat")}/>
      <BottomNavigationAction label="Calendar" value="nearby" icon={<DashboardIcon />} 
      onClick={()=>history.push("/user-home/user-screen/calendar")}/>
      <BottomNavigationAction label="Profile" value="folder" icon={<PersonOutlinedIcon />} 
      onClick={()=>history.push("/user-home/user-screen/specialists")}/>
      <BottomNavigationAction label="Records" value="fol" icon={<ReceiptIcon />} />
    </BottomNavigation>
  );
}
