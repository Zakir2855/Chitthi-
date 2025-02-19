import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../authprovider/AuthProvider";

function PrivateRoute({ children }) {
    const { isLogged } = useContext(auth);
  return isLogged ? children : <Navigate to="/login" />;

}
export default PrivateRoute;