let initialData={
    dataAvailable:false,
    chatMainData:null
}
 export const chatContainer=(state=initialData,action)=>{
    if(action.type=="Data on the way"){
        return {...state,dataAvailable:true,chatMainData:action.payload}
    }
    else {
        return state;
    }
};
