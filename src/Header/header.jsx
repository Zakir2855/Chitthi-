import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

import React, { useContext } from "react";
import TemporaryDrawer from "./profileBar.jsx";
import { auth } from "../authprovider/AuthProvider.jsx";
function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
const {theme}=useContext(auth);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <header className="header">
      <div className="logo_mainPage">
        <img src="../resources/Main_logo.jpg" alt="Logo_mainpage" />
      </div>
      <div className="search_bar">
        <input style={{ backgroundColor: theme ? "black" : "white",color:theme ? "white" : "black" }}
 type="text" placeholder="search chats" />
      </div>

      <div className="user_info">
        <button onClick={toggleDrawer(true)}>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>U</Avatar>
        </button>
      </div>
      <TemporaryDrawer  open={drawerOpen} toggleDrawer={toggleDrawer} />
    </header>
  );
}
export default Header;
