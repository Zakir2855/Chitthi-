import { useDispatch, useSelector } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useContext, useRef, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { auth } from "../authprovider/AuthProvider";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  let navigate=useNavigate();
  let dispatch=useDispatch();
  const [isAvtLdng,setAvtLdng]=useState(false);
  const avatarImageRef = useRef();
  const [imagePreview, setPreview] = useState("");
 const {  theme,Host,setShowImage } = useContext(auth);
  const [avatar, setAvatar] = useState("");
  const userInformation = useSelector((state) => state.userInfo);
  const handleAvatar = () => {
    avatarImageRef.current.click();
  };
  // console.log(userInformation);

  //showing dp
function dpShow(dp){
setShowImage(dp);
navigate("/image")
}
  //
  function handleDPChange() {
    setAvtLdng(true)
    let body_data = new FormData();
    body_data.append("avatar", avatar);
    fetch(`${Host}/user/uploadAvatar/${userInformation.id}`, {
      method: "PATCH",
      credentials: "include",
      body: body_data,
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({type:"reset"});
        setPreview("");
        setAvatar("");
        alert(res.message);
        dispatch({type:"user_info",payload:res.user_data});
        setAvtLdng(false);
        
      })
      .catch((err) => {alert(err);console.log(err)});
  }
  return (
    <div className={theme ? "Profile_page dark" : "Profile_page"}>
      <div className="avatar">
        <div className="avatar_img_hndle">
          <img
            src={
              userInformation.avatar == ""
                ? "../resources/default-avatar-profile-icon.jpg"
                : userInformation.avatar
            }
            onClick={()=>dpShow( userInformation.avatar == ""
              ? "../resources/default-avatar-profile-icon.jpg"
              : userInformation.avatar)}
            alt="avatar"
          />
          <div className="avatar_change_cam">
            <AddPhotoAlternateIcon
              className="avatar_cam"
              onClick={handleAvatar}
            ></AddPhotoAlternateIcon>
          </div>
        </div>
         

        <input
          id="avatar_input"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setAvatar(file);
              const previewUrl = URL.createObjectURL(file);
              setPreview(previewUrl);
            }
          }}
          ref={avatarImageRef}
        />
      </div>
       {/* loader of avatar */}
       {isAvtLdng && (
              <div className="message-loader">
                <ClipLoader color="#4f46e5" size={30} />
              </div>
            )}
      <div className="user_info">
        <h1>{userInformation.Name}</h1>
        <h3>email: {userInformation.email}</h3>
        {avatar ? (
          <div className="preview_div_dp">
            {/* //image preview  */}
            {imagePreview ? (
              <div className="image_preview_dp">
                <img
                  src={imagePreview}
                  style={{ width: "100px", zIndex: "2" }}
                />{" "}
                <ClearIcon
                  className="svg_dp"
                  onClick={() => {
                    setPreview("");
                    setAvatar("");
                  }}
                ></ClearIcon>
              </div>
            ) : (
              ""
            )}
            {/* //  */}
            <button id="avatar_button" onClick={handleDPChange}>
              Change DP
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
