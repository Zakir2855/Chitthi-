import React, { useContext } from 'react';
import { makeStyles } from "@mui/styles";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { auth } from "../authprovider/AuthProvider";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function TemporaryDrawer({ open, toggleDrawer }) {
  const classes = useStyles();
  const navigate=useNavigate();
  const {SetLogged,theme,toggleTheme}=useContext(auth);
const handleLogout=()=>{
SetLogged(false);
navigate("/login");
};
//handling theme here++++++++++++++
const handleTheme=()=>{
toggleTheme(!theme);
}
//
  const list = () => (
    <div
    
      className={classes.list}
      role="presentation"
      // onClick={toggleDrawer(false)}
      // onKeyDown={toggleDrawer(false)}
    >
      <List >
       
          
          <ListItem button  style={{border:"2px solid green",backgroundColor: theme ? "black" : "white",color:theme ? "white" : "black"}}>
            
            <ListItemText primary={"Profile"} />
          </ListItem>
          <ListItem button  style={{border:"2px solid green",backgroundColor: theme ? "black" : "white",color:theme ? "white" : "black"}}>
            
            <ListItemText primary={`Theme: ${theme ? "dark" : "light"}`} onClick={handleTheme} />
          </ListItem>
          <ListItem button  style={{border:"2px solid green",backgroundColor: theme ? "black" : "white",color:theme ? "white" : "black"}}>
            
            <ListItemText primary={"Customer Support"} />
          </ListItem>
          <ListItem button  style={{border:"2px solid green",backgroundColor: theme ? "black" : "white",color:theme ? "white" : "black"}} >
            
            <ListItemText onClick={handleLogout} primary={"Logout"} />
          </ListItem>
         
         
       
      </List>
    </div>
  );

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
}
