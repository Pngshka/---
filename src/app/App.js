import React, { lazy } from 'react';

const Game = lazy(() => import('../features/counter/Game'));
//import { Game } from '../features/counter/Game';


// import dynamic from 'next/dynamic'
// const Game = dynamic(() =>
//   import('../features/counter/Game').then((game) => {game.Game()})
// )


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Game />
        
      </header>
    </div>
  );
}

export default App;
