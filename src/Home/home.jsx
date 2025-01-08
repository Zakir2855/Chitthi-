import { useNavigate } from "react-router-dom";
function Home(){
    const navigate=useNavigate();
    const handleLogin = () => {
        navigate("/login")
    };
    const handleSignUp = () => {
        navigate("/signup")
    };
    return (
        <>
        <h1>Welcome to Chitthi.</h1>
        <p>To continue <button onClick={handleLogin}>Login</button>. Don't have an account <button onClick={handleSignUp}>Sign Up</button>.</p>
        
        </>
    )
}
export default Home;