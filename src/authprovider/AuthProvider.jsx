import { createContext,  useState,useEffect } from "react"

 export const auth=createContext();
function AuthProvider({children}){
   const [theme,toggleTheme]=useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  //debounce function
  function debouncer(fnc,delay){
    let timer;
    return function(...args){
      clearTimeout(timer);
      timer=setTimeout(()=>{
        fnc(...args)
      },delay);
    }
  };
  //
  

  const handleResize = () => {
    setScreenWidth(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
  };
  let debounce=debouncer(handleResize,400);
  useEffect(() => {
    window.addEventListener('resize', debounce);
    // Call handleResize immediately to set the initial width
    handleResize();
    return () => window.removeEventListener('resize', debounce);
  }, []);
  
  // Logging the current screen width whenever it changes
  useEffect(() => {
    console.log( screenWidth);
  }, [screenWidth]);
  //
    const [isLogged,SetLogged]=useState(false);
return (
    <auth.Provider value={{isLogged,SetLogged,screenWidth,theme,toggleTheme}}>
        {children}
    </auth.Provider>
)
}
export  default AuthProvider;