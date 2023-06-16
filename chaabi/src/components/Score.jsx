import { Box, Progress } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

function Score(props) {
  let total_keys_pressed = useSelector((store) => {
    return store.total_keys_pressed;
  });
  let accuracy = useSelector((store) => {
    return store.accuracy;
  });
  let speed = useSelector((store) => {
    return store.speed;
  });
  let timerValue = useSelector((store) => {
    return store.timer_value;
  });
  return (
    <Box>
            <Progress colorScheme="red" height="32px" value={timerValue / 3} />
      <Box display={"flex"} justifyContent={"space-evenly"} className="score">
        <div>
          <h3>Speed</h3>
          <h3>{speed}</h3>
        </div>
        <div>
          <h3>key count</h3>
          <h3>{total_keys_pressed}</h3>
        </div>
        <div>
          <h3>Accuracy</h3>
          <h3>{accuracy} %</h3>
        </div>
      </Box>
    </Box>
  );
}

export default Score;
