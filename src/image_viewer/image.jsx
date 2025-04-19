import { useContext, useEffect } from "react";
import { auth } from "../authprovider/AuthProvider";

export default function ImageViewer(){
    const { showImage,setShowImage } = useContext(auth);
    useEffect(()=>{
return ()=>setShowImage("");
    },[])
    return(
        <div className="imageViewer">
        <img src={showImage?showImage:""} alt="Image" />
        </div>
    )
}