let user = {
  Name: "",
  avatar: "",
  email: "",
  id:""
};
export const userInfo=(state=user,action)=>{
    if(action.type=="user_info"){
        return action.payload
    }
    else {
        return state;
    }
};

