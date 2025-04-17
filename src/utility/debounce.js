export default function debouncer(fnc,delay){
    let timer;
    return function(...args){
      clearTimeout(timer);
      timer=setTimeout(()=>{
        fnc(...args)
      },delay);
    }
  };