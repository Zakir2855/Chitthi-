import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirebaseApp } from "../firebaseconfigs/firebase";
import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import "../signIn/signIn.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPassword(e.target.value);
  };
  const handleCnfmPass = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSignIn = () => {
    navigate("/login");
  };
  const postDetails = (pic) => {
   
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(getFirebaseApp, email, password);

      alert("User created successfully");

      
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="body_cover">
    <form onSubmit={handleSubmit}>
     
      <h1>SignUp</h1>
      <input type="text" placeholder="enter your name" required />
      <input
        type="text"
        placeholder="put your email"
        onChange={handleEmail}
        required
      />

      <input
        type="password"
        placeholder=" set password"
        onChange={handlePass}
        required
      />
      <input
        type="password"
        placeholder="confirm password"
        onChange={(e) => handleCnfmPass(e)}
        required
      />
      <input
        type="file"
        name="upload picture"
        id=""
        accept="image/*"
        onChange={(e) => postDetails(e.target.files[0])}
      />
      <button type="submit">Submit</button>
      <p>
        Already have an account <button onClick={handleSignIn}>SignIn</button>
      </p>
    </form>
    </div>
  );
}
export default memo(SignUp);
