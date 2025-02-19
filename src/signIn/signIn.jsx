import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, memo, useEffect } from "react";
import { getFirebaseApp } from "../firebaseconfigs/firebase";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { auth } from "../authprovider/AuthProvider";
import "./signIn.css";
import Avatar from '@mui/material/Avatar';

function SignIn() {
  if (!localStorage.getItem("id")) {
    localStorage.setItem("id", JSON.stringify([]));
  }
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  let { isLogged, SetLogged } = useContext(auth);
  useEffect(() => console.log(isLogged), [isLogged]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        getFirebaseApp,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User ID (uid):", user.uid);
      let localID = JSON.parse(localStorage.getItem("id"));
      localID.push(user.uid);
      localStorage.setItem("id", JSON.stringify(localID));
      SetLogged(true);
      console.log(isLogged, "after setting true in Sign In");
      navigate("/dashboard");
      
    } catch (err) {
      alert(err.message);
    }
  };
  const handleQuery = (e) => {
    e.preventDefault();
    navigate("/signup");
  };
  return (
    <div className="body_cover">
    <form onSubmit={handleSubmit}>
      <div className="Avatar">
      <img src="../resources/Main_logo.jpg" alt="" />
       </div>
       <div className="border">
      <hr />
       </div>
      <h1>SignIn</h1>
      <input type="text" placeholder="email" onChange={handleEmail} required />

      <input type="password" placeholder="password" onChange={handlePass} required />
      <button type="submit">Submit</button>
      <p>
        do not have an account: <button onClick={handleQuery}>SignUp</button>
      </p>

    </form>
    </div>
  );
}
export default memo(SignIn);
