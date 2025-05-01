import { useState, memo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../signIn/signIn.css";
import { auth } from "../authprovider/AuthProvider";

function SignUp() {
  const { Host } = useContext(auth);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [userDetails, setUserDetails] = useState({
    Name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleDetails = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { Name, email, password, confirm_password } = userDetails;

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${Host}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful! Please sign in.");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="body_cover">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        {error && <div className="error-message">{error}</div>}

        <input
          onChange={handleDetails}
          name="Name"
          type="text"
          placeholder="Full name"
          value={userDetails.Name}
          required
          autoFocus
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={userDetails.email}
          onChange={handleDetails}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Create password (min 8 characters)"
          value={userDetails.password}
          onChange={handleDetails}
          required
        />
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm password"
          value={userDetails.confirm_password}
          onChange={handleDetails}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="form-footer">
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={handleSignIn}
              className="text-button"
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default memo(SignUp);
