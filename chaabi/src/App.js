import { Box } from '@chakra-ui/react';
import './App.css';
import Score from './components/Score';
import Timer from './components/Timer';
import TypingBox from './components/TypingBox';


function App() {
  return (
    <Box height={'100vh'} className="App">
      <Timer />
      <div className='content'>
        <Score /> 
        <TypingBox />
      </div>
      <h1 className='main-heading'>Touch Typing</h1>
      <h3>Made by Nagendra 2022 </h3>
    </Box>
  );
}

export default App;
