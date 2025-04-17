import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { auth } from "../authprovider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../authprovider/socketContext";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function TemporaryDrawer({ open, toggleDrawer }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { SetLogged, theme, toggleTheme,Host } = useContext(auth);
  const {socket}=useContext(SocketContext);
  const userInformation=useSelector((state)=>state.userInfo);

  const handleLogout = () => {
    fetch(` ${Host}/user/logout/${userInformation.id}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        SetLogged(false);
        socket.disconnect();
        alert(res.message);
        navigate("/login");
      })
      .catch((err) => alert(err));
  };
  //handling theme here++++++++++++++
  const handleTheme = () => {
    toggleTheme(!theme);
  };
  //
  const list = () => (
    <div
      className={classes.list}
      role="presentation"

      // onClick={toggleDrawer(false)}
      // onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem
          button
          style={{
            border: "2px solid green",
            backgroundColor: theme ? "black" : "white",
            color: theme ? "white" : "black",
          }}
        >
          <ListItemText primary={"Profile"} onClick={()=>navigate("/profilePage")} />
        </ListItem>
        <ListItem
          button
          style={{
            border: "2px solid green",
            backgroundColor: theme ? "black" : "white",
            color: theme ? "white" : "black",
          }}
        >
          <ListItemText
            primary={`Theme: ${theme ? "dark" : "light"}`}
            onClick={handleTheme}
          />
        </ListItem>
        <ListItem
          button
          style={{
            border: "2px solid green",
            backgroundColor: theme ? "black" : "white",
            color: theme ? "white" : "black",
          }}
        >
          <ListItemText primary={"Customer Support"} />
        </ListItem>
        <ListItem
          button
          style={{
            border: "2px solid green",
            backgroundColor: theme ? "black" : "white",
            color: theme ? "white" : "black",
          }}
        >
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
