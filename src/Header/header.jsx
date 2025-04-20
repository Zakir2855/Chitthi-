import React, { memo, useContext, useEffect, useRef, useState } from "react";
import TemporaryDrawer from "./profileBar.jsx";
import { auth } from "../authprovider/AuthProvider.jsx";
import { useSelector } from "react-redux";
import debouncer from "../utility/debounce.js";
function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { theme, users, setUsers } = useContext(auth);
  const originalUsers = useRef([]);
  useEffect(() => {
    if (users.length > 0 && originalUsers.current.length === 0) {
      originalUsers.current = users;
    }
  }, [users]);
  //
  const userInformation = useSelector((state) => state.userInfo);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  //searching users
  function handleSearch(e) {
    const value = e.target.value;

    if (value.length >= 3) {
      let all = originalUsers.current.filter((customer) =>
        customer.Name.toLowerCase().includes(value.toLowerCase())
      );
      setUsers(all);
    } else if (value.length === 0) {
      setUsers(originalUsers.current);
    }
  }
  //debouncing search
  let searchDeb = debouncer(handleSearch, 1000);
  //reseting users
  useEffect(() => {
    setUsers(originalUsers.current);
  }, []);

  return (
    <header className="header">
      <div className="logo_mainPage">
        <img src="/resources/Main_logo.jpg" alt="Logo_mainpage" />
      </div>
      <div className="search_bar">
        <input
          style={{
            backgroundColor: theme ? "black" : "white",
            color: theme ? "white" : "black",
          }}
          type="text"
          placeholder="search contacts"
          onChange={searchDeb}
        />
      </div>

      <div className="user_info">
        <button
          style={{ width: "100%", height: "100%" }}
          onClick={toggleDrawer(true)}
        >
          {/* <Avatar sx={{ bgcolor: deepOrange[500] }}>U</Avatar> */}
          <img
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            src={
              userInformation.avatar == ""
                ? "/resources/default-avatar-profile-icon.jpg"
                : userInformation.avatar
            }
            alt="avatar"
          />
        </button>
      </div>
      <TemporaryDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
    </header>
  );
}
export default memo(Header);
