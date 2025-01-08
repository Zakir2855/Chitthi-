import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../signIn/signIn";
import SignUp from "../signUp/signup";
import Home from "../Home/home";
import PrivateRoute from "../privateroute/privateroute";
import Dashboard from "../dashboard/dashboard";
function Routers() {
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
      </Routes>
    </BrowserRouter>
  );
}
export default Routers;
