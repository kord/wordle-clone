import React from 'react';
import './App.css';
import './init.ts';
import GamePanel from "./components/gamePanel";

function App() {
  return (
      <div className="App">
          <header className="App-header">

              <GamePanel/>

          </header>
      </div>
  );
}

export default App;
