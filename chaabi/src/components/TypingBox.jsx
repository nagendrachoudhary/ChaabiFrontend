import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePromptThunkActionCreator } from "../redux/action";
function TypingBox(props) {
  const [keysPressed, setKeysPressed] = useState(0);
  const [error, setError] = useState(false);
  const [typos, setTypos] = useState(0);
  const [current,setcurrent]=useState(0)
  const prompt = useSelector((store) => {
    return store.current_prompt;
  });

  const timerValue = useSelector((store) => {
    return store.timer_value;
  });
useEffect(() => {
  if(timerValue==300){
    document.getElementById("user-text").value=""
    setError(false);
  }
  
}, [timerValue])
  const dispatch = useDispatch();
  const checkInput = (e) => {
    const input = e.target.value;
    const words = prompt.split(" ");
    const inputs= input.split(" ")
    setKeysPressed(keysPressed + 1);
   if(e.nativeEvent.data==' '){
      setcurrent((prv)=>prv+1)
    }
    if (input !== prompt.substr(0, input.length)) {
      setTypos(typos + 1);
      setError(true);
    }

    if (input === prompt.substr(0, input.length)) {
      setError(false);
    }
    // if input matches completely with prompt then calculate score and generate new prompt
    if (input.length === prompt.length) {
      dispatch({
        type: "UPDATE_SCORE",
        payload: {
          keysPressed,
          typos,
        },
      });
      dispatch(generatePromptThunkActionCreator());
      // resetting the values
      e.target.value = "";
      setKeysPressed(0);
      setTypos(0);
    }
  };

  return (
    <div className="typing-box">
      <input
        type="text"
        name="user-text"
        id="user-text"
        onChange={checkInput}
        style={{ backgroundColor: !error ? "white" : "red" }}
        placeholder={timerValue === 300? "click start": "Type here..."}
        disabled={timerValue === 300}

      />
     
    </div>
  );
}

export default TypingBox;
