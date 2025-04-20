import { createContext, useState, useEffect, useMemo } from "react";
import debouncer from "../utility/debounce";
export const auth = createContext();
function AuthProvider({ children }) {
  const Host = import.meta.env.VITE_HOST;
  const [selectedUser, setSelectedUser] = useState(null);//user selcted in chats
  const [theme, toggleTheme] = useState(false);
  const [showPaint, setShowPaint] = useState(false);//for starting banner
  const [showImage, setShowImage] = useState("");//for viewing any image
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);//screen size
  const handleResize = () => {
    setScreenWidth(
      window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
    );
  };
  const debounce = useMemo(() => debouncer(handleResize, 400), []);
  useEffect(() => {
    window.addEventListener("resize", debounce);
    // Calling handleResize immediately to set the  width
    handleResize();
    return () => window.removeEventListener("resize", debounce);
  }, []);

  // Logging the current screen width whenever it changes
  // useEffect(() => {
  //   console.log(screenWidth);
  // }, [screenWidth]);
  //

  const [isLogged, SetLogged] = useState(false);//handling frontend sign in permissions

  //
  //
  let [users, setUsers] = useState([]); //user storage for all users in contacts
  //contacts fetching
  useEffect(() => {
    if (isLogged)
      fetch(`${Host}/mssg/users`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          setUsers(res.users);
          console.log(res);
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          setUsers([]);
        });
  }, [isLogged, SetLogged]);
  //
  //to match users device theme preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    toggleTheme(prefersDark.matches);
  }, []);

  return (
    <auth.Provider
      value={{
        isLogged,
        SetLogged,
        screenWidth,
        theme,
        toggleTheme,
        showPaint,
        setShowPaint,
        selectedUser,
        setSelectedUser,
        users,
        setUsers,
        Host,
        setShowImage,
        showImage,
      }}
    >
      {children}
    </auth.Provider>
  );
}
export default AuthProvider;
