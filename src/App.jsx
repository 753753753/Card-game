import { useState } from "react";
import PlayerInput from "./components/PlayerInput";
import GameBoard from "./components/GameBoard";

function App() {
  const [players, setPlayers] = useState([]);
  
  return (
    <div className="App">
      {players.length === 0 ? (
        <PlayerInput onStart={setPlayers} />
      ) : (
        <GameBoard players={players} />
      )}
    </div>
  );
}

export default App;
