let initialState = {
  
  chats: [],
  chatsAvailable: false,
};

export default function Chats(state = initialState, action) {
  switch (action.type) {
    case "SET_CHATS":
      return {
        ...state,
        chatsAvailable: true,
        chats: action.payload,
      };

    case "defaultState":
      return {
        ...state,
        chatsAvailable: false,
        chats: [],
      };

    default:
      return state;
  }
}
//Chats are here
//defaultState