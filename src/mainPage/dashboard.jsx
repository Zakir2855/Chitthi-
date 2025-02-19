import { useContext, useEffect, useState } from "react";
import Header from "../Header/header";
import SideBar from "../chatpage/sideBar";
import "../index.css";
import ChatsData from "../chatpage/chatsData";

function Dashboard() {
  

  const [chatData, setChatData] = useState(null);
  useEffect(()=>{
    console.log(chatData,"in dashboard component")
  },[setChatData])
  // dynamic data from api would be here till then 
 
  
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard_main">
        <div className="chats-sideBar">
      <SideBar setChatData={setChatData}/>
      </div>
      <div className="chat_board">
      <ChatsData chatData={chatData} />
      </div>
      </div>
    </div>
  );
}
export default Dashboard;