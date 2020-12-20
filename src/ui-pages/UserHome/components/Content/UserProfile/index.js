import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { mapDispatchToProps, getTime, getDateandDay } from "../../../../../ui-utils/commons";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import { mapDispatchToProps, getTime, getDateandDay } from "../../../../../ui-utils/commons";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import  Card  from "@material-ui/core/Card";
// import { Grid } from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
// import { Avatar } from "@material-ui/core/Avatar";
import image1 from './sample.jpg';


function TabContainer(props) {
  // const history = useHistory();

  console.log(props.childern,"iiii")
  return (
    <Typography component="div">
      {/* {props.childern} */}
    {/* {props.children==="one"?history.push("/user-home/user-profile/personal"):history.push("/user-home/user-profile/password")} */}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class UserProfile extends React.Component {
  state = {
    value: "one"
  };
componentDidMount=()=>{
  const {history}=this.props
  history.push("/user-home/user-profile/user-personal")
}
  handleChange = (event, value) => {
      const {history}=this.props
    this.setState({ value });
    if(value==="one"){
    history.push("/user-home/user-profile/user-personal")
    }
    else{
      history.push("/user-home/user-profile/user-password")
    }
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
     console.log("userprofile",this.props.screenConfiguration)

    return (

      <div 
      // className={classes.root}
      >
        <AppBar position="static" >
        <Card>
                  <CardContent>
                    <Grid style={{ display: "flex", marginTop:'10px' }}>
                      {/* <Grid item xs={3}>
                        <Avatar />
                      </Grid>
                      <Grid item md={9}>
                        <Typography variant="h6">{data.doctor_name}</Typography>
                        <Typography color="textSecondary" variant="subtitle2">
                          {data.Doctor_speciality}
                        </Typography>
                      </Grid> */}

                      <Grid item xs={10} sm={10} >
                        <Grid container direction="column"
                            justify="center"
                            alignItems="center" xs={12} >
                            <Grid item xs sm  style={{display:'flex', justifyContent:'center', width:'150px', height:'150px' }}>
                                <Avatar src={image1} />
                            </Grid>
                            <Grid item xs sm>
                                <Typography variant="h5">Some Heading</Typography>
                            </Grid>
                            <Grid item xs sm>
                                <Typography variant="h6">Some Heading</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <EditIcon />
                    </Grid>
    

                    </Grid>
                  </CardContent>
                </Card>
          <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
            <Tab style={{fontSize:"11px"}}
              value="one"
              label="PERSONAL"
            />
            <Tab value="two" style={{fontSize:"11px"}}label="PASSWORD" />
          </Tabs>
        </AppBar>
        {value === "one" && <TabContainer>Item One</TabContainer>}
        {value === "two" && <TabContainer>Item Two</TabContainer>}
      </div>
    );
  }
}

// UserProfile.propTypes = {
//   classes: PropTypes.object.isRequired
// };


// export default withStyles(styles)(UserProfile);



const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { landing = {} } = preparedFinalObject;
  const { latestAppointment = [] } = landing;
  return { screenConfiguration } 
};

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(UserProfile)



















// import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import Avatar from '@material-ui/core/Avatar';
// import EditIcon from '@material-ui/icons/Edit';
// import image1 from './sample.jpg';
// import Typography from '@material-ui/core/Typography';
// import PropTypes from 'prop-types';
// // import SwipeableViews from 'react-swipeable-views';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Box from '@material-ui/core/Box';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import Divider from '@material-ui/core/Divider';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import { deepOrange, green } from '@material-ui/core/colors';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
// import TextField from '@material-ui/core/TextField';
// import { InputLabel } from '@material-ui/core';
// import './UserProfile.css'

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`full-width-tabpanel-${index}`}
//             aria-labelledby={`full-width-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 // <Box p={3}>
//                 //     <Typography>{children}</Typography>
                  
//                 // </Box>
//                 <List >
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           {/* <Avatar alt="Remy Sharp" src={image1} /> */}
//           <Avatar variant="square" size="50px" >
//             <AssignmentIcon />
//           </Avatar>
//         </ListItemAvatar>
//         <ListItemText
//           primary={children}
//           secondary={
//             <React.Fragment>
//               <Typography
//                 component="span"
//                 variant="body2"
//                 // className={classes.inline}
//                 style={{display:'inline'}}
//                 color="textPrimary"
//               >
//                 {children}
//               </Typography>
//               {value}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="inset" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar variant="square"  >
//           {/* <Avatar alt="Travis Howard" src={image1} /> */}
//           <AssignmentIcon />
//           </Avatar>
//         </ListItemAvatar>
//         <ListItemText
//           primary={children}
//           secondary={
//             <React.Fragment>
//               <Typography
//                 component="span"
//                 variant="body2"
//                 style={{display:'inline'}}
//                 // className={classes.inline}
//                 color="textPrimary"
//               >
//                 {children}
//               </Typography>
//               {value}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="inset" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar variant="square" >
//           {/* <Avatar alt="Cindy Baker" src={image1} /> */}
//           <AssignmentIcon />
//           </Avatar>
//         </ListItemAvatar>
//         <ListItemText
//           primary={children}
//           secondary={
//             <React.Fragment>
//               <Typography
//                 component="span"
//                 variant="body2"
//                 style={{display:'inline'}}
//                 // className={classes.inline}
//                 color="textPrimary"
//               >
//                 {children}
//               </Typography>
//               {value}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//     </List>
//             )}
//         </div>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//     return {
//         id: `full-width-tab-${index}`,
//         'aria-controls': `full-width-tabpanel-${index}`,
//     };
// }


// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,

//      square: {
//       color: theme.palette.getContrastText(deepOrange[500]),
//        backgroundColor: deepOrange[500],
//      },
//         // margin: 10,
//         // small: {
//         //     width: theme.spacing(3),
//         //     height: theme.spacing(3),
//         // },
//         // inline: {
//         //     display: 'inline',
//         //   },
//     },
// }));

// export default function UserProfile() {
//     // class UserProfile extends React.Component{

//         const classes = useStyles();
//         const theme = useTheme();
    
//         const [value, setValue] = React.useState(0);
//         //     state={
//         // value:0
//         //      }
//         const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
        
//         const handleDateChange = (date) => {
//           setSelectedDate(date);
//         };
        
//         const handleChange = (event, newValue) => {
//             setValue(newValue);
//         };
//         // handleChange= (e,newValue) => {
//         //     this.setState({
//         //         value:e.target.newNalue
//         //     })
//         // }
    
//         const handleChangeIndex = (index) => {
//             setValue(index);
//         };
//         // handleChangeIndex = (index) => {
//         //     this.setState({value:index})
//         // }

//         // render(){
//             return (
//                 <div 
//                 className={classes.root}
                
//                 >
//                 <Grid container style={{ marginTop: '10px' }}>
//                     <Grid item xs={10} sm={10}>
//                         <Grid container direction="column"
//                             justify="center"
//                             alignItems="center" xs={12} >
//                             <Grid item xs sm>
//                                 <Avatar src={image1} />
//                             </Grid>
//                             <Grid item xs sm>
//                                 <Typography variant="h5">Some Heading</Typography>
//                             </Grid>
//                             <Grid item xs sm>
//                                 <Typography variant="h6">Some Heading</Typography>
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                     <Grid item xs={2} sm={2}>
//                         <EditIcon />
//                     </Grid>
    
    
//                     <AppBar position="static" style={{ backgroundColor: '#2FC9B9', marginTop: '20px' }}>
//                         <Tabs
//                             value={value}
//                             onChange={handleChange}
//                             indicatorColor="primary"
//                             textColor="primary"
//                             variant="fullWidth"
//                         aria-label="full width tabs example"
//                         >
//                             <Tab label="Item One" {...a11yProps(0)} />
//                             <Tab label="Item Two" {...a11yProps(1)} />
//                             <Tab label="Item Three" {...a11yProps(2)} />
//                         </Tabs>
//                     </AppBar>
//                     {/* <SwipeableViews
//                         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//                         index={value}
//                         onChangeIndex={handleChangeIndex}
//                     > */}
//                         <TabPanel value={value} index={0}
//                         //  dir={theme.direction}
//                          >
                            
//                             <Grid container>
//                     <Grid item xs={4} sm={4}>
//                         <InputLabel>Enter the DOB</InputLabel>
//                     </Grid>
//                     <Grid item xs={8} sm={8}>
//                     <form className={classes.container} noValidate>
//       <TextField
//         id="datetime-local"
//         // label="Next appointment"
//         type="datetime-local"
//         defaultValue="2017-05-24T10:30"
//         className={classes.textField}
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//     </form>
//                     </Grid>
//                     </Grid>   





//             </TabPanel>
//                         <TabPanel value={value} index={1} 
//                         // dir={theme.direction}
//                         >
//                             Item Two
//             </TabPanel>
//                         <TabPanel value={value} index={2} 
//                         // dir={theme.direction}
//                         >
//                             Item Three
//             </TabPanel>
//                     {/* </SwipeableViews> */}
    
//                 </Grid>

//             </div>
//             )
//         }
//     // }
   

//     // export default UserProfile;
