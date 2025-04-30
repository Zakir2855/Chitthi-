import { useState, memo, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../authprovider/AuthProvider";
import "./signIn.css";
import { useDispatch } from "react-redux";

function SignIn() {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [isLogging,setIsLogging]=useState(false);
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const { isLogged, SetLogged,Host } = useContext(auth);
//temporary alert

useEffect(()=>{
  alert("Due to hosting limitaions please wait for 1 min after pressing login/create account for the first time.")
  return ()=>setIsLogging(false);
},[])
  // useEffect(() => {
  //   console.log("Login status:", isLogged);
  // }, [isLogged]);

  const handleSubmit = async (e) => {
    setIsLogging(true)
    e.preventDefault();
    const body_data = JSON.stringify({ email, password });

    try {
      const res = await fetch(`${Host}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body_data,
        credentials: "include"

      });

      const data = await res.json();

      if (data.message === "User logged in successfully") {
dispatch({type:"user_info",payload:data.user_data})
        alert("Login successful");
        SetLogged(true);
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
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
          <img src="/resources/Main_logo.jpg" alt="Logo" />
        </div>
        <div className="border">
          <hr />
        </div>
        <h1>Sign In</h1>

        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          required
        />

        {!isLogging&&<button type="submit">Submit</button>}
        <p>
          Don’t have an account?{" "}
          <button type="button" onClick={handleQuery}>
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}

export default memo(SignIn);
