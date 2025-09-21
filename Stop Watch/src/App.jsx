import React, { useRef, useState } from "react"
import "./App.css"

function App(){
  const [time,settime] = useState(0);

  let timerRef=useRef(null);

  function startTimer(){
    timerRef.current = setInterval(()=>{
      settime(time=>time+1)
    },1000)
  }
  function stopTimer(){
    clearInterval(timerRef.current);
    timerRef.current=null;
  }
  function resetTimer(){
    stopTimer();
    settime(0);
  }
  return(
    <div className="container">
      <h1>Timer: {time} seconds</h1>
      <button onClick={startTimer}>Start</button>

      <button onClick={stopTimer}>Stop</button>

      <button onClick={resetTimer}>Reset</button>
    </div>  
  )
}

export default App;