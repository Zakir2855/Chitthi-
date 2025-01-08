import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirebaseApp } from "../firebaseconfigs/firebase";
import {  useState,memo } from "react";
import { useNavigate } from "react-router-dom";
function SignUp() {
    
  const [email, setEmail] = useState("");
  const navigate=useNavigate();
  const [password, setPassword] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(getFirebaseApp, email, password);
     
      alert("User created successfully");
      
        // setRoute here
        navigate("/login");
      
    } catch (error) {
      alert(error.message);
    }
  };
  return(
    <form onSubmit={handleSubmit}>
      <h1>SignUp</h1>
      <input 
      type="text" 
      placeholder="email" 
      onChange={handleEmail}
       required 
       />

      <input
        type="password"
        placeholder="password"
        onChange={handlePass}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
export default memo(SignUp);
