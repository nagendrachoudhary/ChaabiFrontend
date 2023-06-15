import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePromptThunkActionCreator } from "../redux/action";
import { Box, Text } from "@chakra-ui/react";

function PromptBox(props) {
  const currentPrompt = useSelector((store) => {
    return store.current_prompt;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(generatePromptThunkActionCreator());
  }, []);

  return (
    <Box bg={'gray'}>
      <Text fontSize={'4xl'}>{currentPrompt}</Text>
    </Box>
  );
}

export default PromptBox;
