import { Host } from "../../utility/utility";



export const fetchChats = (chatId) => {

    return async (dispatch) => {
    

      try {
        const response = await fetch(`${Host}/mssg/allMessages/${chatId}`, {
          method: "GET",
          credentials: "include",
        });
  
        const data = await response.json();
        // console.log(data.messages);
  
        dispatch({ type: "SET_CHATS", payload: data.messages });
      } catch (error) {
        console.error("Failed to fetch chats:", error);
        
      }
    };
  };
  