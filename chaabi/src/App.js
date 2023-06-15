import './App.css';
import PromptBox from './components/PromptBox';
import Score from './components/Score';
import Timer from './components/Timer';
import TypingBox from './components/TypingBox';


function App() {
  return (
    <div className="App">
      <Timer />
      <div className='content'>
        <PromptBox />
        <TypingBox />
        <Score /> 
        <img src='https://www.ratatype.com/static/i/learn/keyboard/en/keyboard.webp'></img>
      </div>
      <h1 className='main-heading'>Touch Typing</h1>
      <h3>Made by Nagendra 2022 </h3>
    </div>
  );
}

export default App;
