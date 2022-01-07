import React from 'react';
import './css/App.css';
import './init.ts';
import GamePanel from "./components/gamePanel";

function App() {
  return (
      <div className="App">
          <header className="App-header">
          </header>

          <GamePanel/>
      </div>
  );
}

export default App;
