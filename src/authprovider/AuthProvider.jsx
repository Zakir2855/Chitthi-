import { createContext,  useState } from "react"

 export const auth=createContext();
function AuthProvider({children}){
    const [isLogged,SetLogged]=useState(false);
return (
    <auth.Provider value={{isLogged,SetLogged}}>
        {children}
    </auth.Provider>
)
}
export  default AuthProvider;