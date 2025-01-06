import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirebaseApp } from "../firebaseconfigs/firebase";

function SignUp() {
  const [email, setEmail] = useState("");
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
      setTimeout(() => {
        // setRoute here
        window.location.reload();
      }, 1000);
    } catch (error) {
      alert(error.message);
    }
  };
  retrun(
    <form onSubmit={handleSubmit}>
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
export default SignUp;
