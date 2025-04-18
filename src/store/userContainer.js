const initialState = {
    Name: "",
    avatar: "",
    email: "",
    id: ""
  };
  
  export const userInfo = (state = initialState, action) => {
    switch (action.type) {
      case "user_info":
        return action.payload;
      case "reset":
        return {
            Name: "",
            avatar: "",
            email: "",
            id: ""
          };
      default:
        return state;
    }
  };
  