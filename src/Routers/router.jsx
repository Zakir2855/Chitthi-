import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../signIn/signIn";
import SignUp from "../signUp/signup";
import Home from "../Home/home";
import PrivateRoute from "../privateroute/privateroute";
import Dashboard from "../mainPage/dashboard";
import { useContext, useEffect } from "react";
import { auth } from "../authprovider/AuthProvider";
import ChatsData from "../chatpage/chatsData";
import Profile from "../Header/profile";
import ImageViewer from "../image_viewer/image";
function Routers() {
  const {isLogged,screenWidth}=useContext(auth);
  useEffect(()=>{
    console.log(screenWidth,"inRouters")
  },[screenWidth])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        
        <Route path="/signup" element={<SignUp />} />
        <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        <Route
            path="/chatBoard"
            element={
              <PrivateRoute>
                <ChatsData/>
              </PrivateRoute>
            }
          />
        <Route
            path="/profilePage"
            element={
              <PrivateRoute>
                <Profile/>
              </PrivateRoute>
            }
          />
        <Route
            path="/image"
            element={
              <PrivateRoute>
                <ImageViewer/>
              </PrivateRoute>
            }
          />
          
        
      
      </Routes>
    </BrowserRouter>
  );
}
export default Routers;
