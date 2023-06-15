import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Heading,
  Progress,
  Box,
} from "@chakra-ui/react";
import { generatePromptThunkActionCreator } from "../redux/action";

function Timer(props) {
  const [timerId, setTimerId] = useState();
  const [timer, setTimer] = useState(300);

  const { isOpen, onOpen, onClose } = useDisclosure();

  let timerValue = useSelector((store) => {
    return store.timer_value;
  });

  let total_keys_pressed = useSelector((store) => {
    return store.total_keys_pressed;
  });

  let total_typos = useSelector((store) => {
    return store.total_typos;
  });

  let total_words_count = useSelector((store) => {
    return store.total_words_count;
  });

  const dispatch = useDispatch();

  dispatch({
    type: "UPDATE_TIMER",
    payload: timer,
  });

  function startGame() {
    let id = setInterval(() => {
      document.getElementById("backgroundMusic").play();
      setTimer((prev) => prev - 1);
    }, 1000);

    setTimerId(id);
    setTimer(300);

    dispatch({
      type: "START_NEW_GAME",
    });

    dispatch(generatePromptThunkActionCreator());
  }

  function endGame() {
    
    clearInterval(timerId);
    setTimerId(undefined);
    setTimer(300);
    onOpen();
  }

  function getOverallAccuracy() {
    if (total_keys_pressed === 0) {
      return 0;
    }

    let correctKeys = total_keys_pressed - total_typos;

    let accuracy = Math.round((correctKeys / total_keys_pressed) * 100);

    return accuracy;
  }

  function getAverageSpeed() {
    if (timerValue === 300) {
      return 0;
    }

    let minutes = timerValue / 60;

    let speed = Math.round(total_words_count / ((300 - timerValue) / 60));

    return speed;
  }
  let minutes = Math.floor(timerValue / 60);
  let seconds = timerValue % 60;
  if (timerValue === 0) {
    endGame();
  }
  return (
    <div>
      <audio id="backgroundMusic">
        <source src="/second-hand-ticking-stopwatch-timer-149907_fewEiOdX.mp3" />
        Your browser does not support the audio element.
      </audio>
      <Progress colorScheme="red" height="32px" value={timerValue / 3} />
      <Box display={'flex'} justifyContent={'space-between'} width={'50vw'} margin={'auto'} marginTop={'20px'} marginBottom={'-20px'}> 
        <Box width={'70px'} borderRadius={'10px'} alignItems={'center'} display={'flex'} justifyContent={'center'} height={'40px'} bg={'teal'}>
          <span>{`${minutes} : ${seconds}`}</span>
        </Box>
        <Button
          bgColor={"teal"}
          color={"white"}
          onClick={!timerId ? startGame : endGame}>
          {!timerId ? "Start" : "End"}
        </Button>
      </Box>
     
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={"black"} bgColor={"teal.500"}>
          <ModalHeader>
            <Heading color={"maroon"} textAlign={"center"}>
              Score
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}>
              <Box>
                <p style={{ color: "maroon", textDecoration: "underline" }}>
                  Speed
                </p>
                <p>{getAverageSpeed()} wpm</p>
              </Box>
              <Box>
                <p style={{ color: "maroon", textDecoration: "underline" }}>
                  Accuracy
                </p>
                <p>{getOverallAccuracy()} %</p>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Timer;
