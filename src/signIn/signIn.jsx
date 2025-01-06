import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { getFirebaseApp } from "../firebaseconfigs/firebase";

function SignIn(){
const [email,setEmail]=useState("");
const [password,setPass]=useState("");
const handleEmail=(e)=>{
setEmail(e.target.value);
};
const handlePass=(e)=>{
    setPass(e.target.value);
};
const handleSubmit= async(e)=>{
e.preventDefault();
try{
await signInWithEmailAndPassword(getFirebaseApp,email,password);
// setRoute here 
}
catch(err){
alert(err.message);
};


}
    return(

        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="email" onChange={handleEmail}/>
       
        <input type="password" placeholder="password" onChange={handlePass}/>
        <button type="submit">Submit</button>
        </form>
    )
}