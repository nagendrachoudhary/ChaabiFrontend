import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePromptThunkActionCreator } from "../redux/action";
import { Box, Text } from "@chakra-ui/react";
function TypingBox(props) {
  const [keysPressed, setKeysPressed] = useState(0);
  const [error, setError] = useState(false);
  const [typos, setTypos] = useState(0);
  const [current, setcurrent] = useState(0);
  const [string, setstring] = useState("");
  const dispatch = useDispatch();

  const prompt = useSelector((store) => {
    return store.current_prompt;
  });
  const timerValue = useSelector((store) => {
    return store.timer_value;
  });

  useEffect(() => {
    if (timerValue == 300) {
      document.getElementById("user-text").value = "";
      setstring("")
      setError(false);
    } else {
      document.getElementById("user-text").focus();
    }
  }, [timerValue]);
  const currentPrompt = useSelector((store) => {
    return store.current_prompt;
  });
  useEffect(() => {
    dispatch(generatePromptThunkActionCreator());
  }, []);

  const checkInput = (e) => {
    const input = e.target.value;
    setKeysPressed(keysPressed + 1);
    if (input !== prompt.substr(0, input.length)) {
      document.getElementById("backgroundMusic").play();
      setTypos(typos + 1);
      setError(true);
      e.target.value=string
    }

    if (input === prompt.substr(0, input.length)) {
      setstring(input);
      setError(false);
    }
    // if input matches completely with prompt then calculate score and generate new prompt

    if (input === prompt) {
      setstring("");
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
  let first = currentPrompt.slice(0, string.length);
  let mid = currentPrompt[string.length];
  let last = currentPrompt.slice(string.length + 1, currentPrompt.length + 1);
  if(timerValue==300){
    mid = currentPrompt[string.length];
   last = currentPrompt.slice(1, currentPrompt.length + 1);
  }
  return (
    <Box height={'75vh'} className="typing-box">
      <audio id="backgroundMusic">
        <source src="/sound.mp3" />
        Your browser does not support the audio element.
      </audio>
      <Text fontSize={"4xl"} bg={"Highlight"}>
        <span style={{ color: "green" }}>{first}</span>
        <span style={{ color: "red", textDecoration: "underline" }}>{mid}</span>
        {last}
      </Text>
      <input
        type="text"
        name="user-text"
        id="user-text"
        onChange={checkInput}
        style={{ backgroundColor: !error ? "white" : "red" }}
        placeholder={timerValue === 300 ? "click start" : "Type here..."}
        disabled={timerValue === 300}
      />
      <div className="Keybord">
        <ul className="row row-1">
          <div className="q">q</div>
          <div className="w">w</div>
          <div className="e">e</div>
          <div className="r">r</div>
          <div className="t">t</div>
          <div className="y">y</div>
          <div className="u">u</div>
          <div className="i">i</div>
          <div className="o">o</div>
          <div className="p">p</div>
          <div className="[">[</div>
          <div className="]">]</div>
        </ul>
        <ul className="row row-2">
          <div id="a" style={{backgroundColor:mid=='a'?'red':'transparent'}} >a</div>
          <div id="s" style={{backgroundColor:mid=='s'?'red':'transparent'}} >s</div>
          <div id="d" style={{backgroundColor:mid=='d'?'red':'transparent'}} >d</div>
          <div id="f" style={{backgroundColor:mid=='f'?'red':'transparent'}} >f</div>
          <div id="g" style={{backgroundColor:mid=='g'?'red':'transparent'}} >g</div>
          <div id="h" style={{backgroundColor:mid=='h'?'red':'transparent'}} >h</div>
          <div id="j" style={{backgroundColor:mid=='j'?'red':'transparent'}} >j</div>
          <div id="k" style={{backgroundColor:mid=='k'?'red':'transparent'}} >k</div>
          <div id="l" style={{backgroundColor:mid=='l'?'red':'transparent'}} >l</div>
          <div id=";" style={{backgroundColor:mid==';'?'red':'transparent'}} >;</div>
          <div id="'" style={{backgroundColor:mid=="'"?'red':'transparent'}} >'</div>
        </ul>
        <ul className="row row-3">
          <div className="z">z</div>
          <div className="x">x</div>
          <div className="c">c</div>
          <div className="v">v</div>
          <div className="b">b</div>
          <div className="n">n</div>
          <div className="m">m</div>
          <div className=",">,</div>
          <div className=".">.</div>
          <div className="/">/</div>
        </ul>
        <ul className="row row-4">
          <div className="SPACEKEY" style={{backgroundColor:mid==' '?'red':'transparent'}}  id="SPACE">
            SPACE
          </div>
        </ul>
      </div>
    </Box>
  );
}

export default TypingBox;
