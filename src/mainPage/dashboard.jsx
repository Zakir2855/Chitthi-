import { memo, useContext, useEffect, useState } from "react";
import Header from "../Header/header";
import "../index.css";
import ChatsData from "../chatpage/chatsData";
import  Sidebar from "../chatpage/sideBar";

function Dashboard() {
  

  const [chatData, setChatData] = useState(null);
  // useEffect(()=>{
  //   console.log(chatData,"in dashboard component")
  // },[setChatData])
  // dynamic data from api would be here till then 
 
  
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard_main">
        <div className="chats-sideBar">
      <Sidebar setChatData={setChatData}/>
      </div>
      <div className="chat_board">
      <ChatsData chatData={chatData} />
      </div>
      </div>
    </div>
  );
}
export default memo(Dashboard);