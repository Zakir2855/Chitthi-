import { useNavigate } from "react-router-dom";
import './home.css';
import * as React from 'react';
import Container from '@mui/material/Container';

function Home(){
    const navigate=useNavigate();
    const handleLogin = () => {
        navigate("/login")
    };
    const handleSignUp = () => {
        navigate("/signup")
    };
    return (
        <Container className="home">
            <div className="landingPage">
                <img src="../resources/Main_logo.jpg" alt="Logo" />
        <h1>Welcome to Chitthi.</h1>
        <p>To continue <button onClick={handleLogin}>Login</button>. Don't have an account <br /> <button onClick={handleSignUp}>Sign Up</button>.</p>
        </div>
        </Container>
    )
}
export default Home;