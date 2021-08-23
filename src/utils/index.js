export function debounce(fn, time = 0){
  let prevTimer = null;
  return function(){
    clearInterval(prevTimer);
    let context = this, args = arguments
    let calledFn = () => { 
      fn.apply(context, args);
    }
    prevTimer = setTimeout(calledFn,time);
  }
}