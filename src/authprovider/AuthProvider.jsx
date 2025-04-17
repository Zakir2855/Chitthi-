import { createContext, useState, useEffect, useMemo } from "react";
import debouncer from "../utility/debounce";
export const auth = createContext();
function AuthProvider({ children }) {
  const Host=import.meta.env.VITE_HOST
  const [selectedUser, setSelectedUser] = useState(null);
  const [theme, toggleTheme] = useState(false);
  const [showPaint, setShowPaint] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
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

  const [isLogged, SetLogged] = useState(false);

  //
  //
  let [users, setUsers] = useState([]); //user storage
  //chats getter
  useEffect(() => {
   if(isLogged)( fetch(`${Host}/mssg/users`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.users);
        // console.log(res);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]); 
      }))
      
  }, [isLogged]);
  //
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
        Host
      }}
    >
      {children}
    </auth.Provider>
  );
}
export default AuthProvider;
