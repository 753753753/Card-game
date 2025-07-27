import { useState, useEffect } from "react";
import ScoreTable from "./ScoreTable";
import Result from "./Result";

const GameBoard = ({ players }) => {
  const [round, setRound] = useState(1);
  const [scores, setScores] = useState([]);
  const [hands, setHands] = useState([0, 0, 0, 0]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ✅ Load saved game data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("callbreak_game");
    if (saved) {
      const data = JSON.parse(saved);
      setRound(data.round);
      setScores(data.scores);
      setHands(data.hands);
      setIsSubmitted(data.isSubmitted);
    }
  }, []);

  // ✅ Save game state to localStorage
  useEffect(() => {
    localStorage.setItem(
      "callbreak_game",
      JSON.stringify({ round, scores, hands, isSubmitted })
    );
  }, [round, scores, hands, isSubmitted]);

  const handleInputChange = (index, value) => {
    const updated = [...hands];
    updated[index] = parseInt(value) || 0;
    setHands(updated);
  };

  const handleNext = () => {
    setScores([...scores, hands]);
    setHands([0, 0, 0, 0]);
    setRound((prev) => prev + 1);
  };

  const handleSubmit = () => {
    setIsSubmitted(true); // just go to result
  };



  const handleDeleteLastRound = () => {
    if (scores.length > 0) {
      const updatedScores = scores.slice(0, -1);
      setScores(updatedScores);
      setRound((prev) => prev - 1);
    }
  };

  const handleGoBack = () => {
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Result
        players={players}
        scores={[...scores, hands]} // just display it here
        onGoBack={() => setIsSubmitted(false)}
      />
    );
  }


  return (
    <div className="p-4 sm:p-6 min-h-screen bg-green-900 text-white font-sans">
      <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 text-center mb-6 sm:mb-8 drop-shadow">
        🃏 Round {round}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {players.map((player, index) => (
          <div
            key={index}
            className="bg-white text-black rounded-xl p-4 shadow-lg border-2 border-gray-300"
          >
            <label className="block text-center text-base sm:text-lg font-semibold mb-2">
              {player}
            </label>
            <input
              type="number"
              min="0"
              max="13"
              value={hands[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-8">
        <button
          onClick={handleNext}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold shadow-md"
        >
          ➕ Next Round
        </button>
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-semibold shadow-md"
        >
          ✅ Submit Game
        </button>
        <button
          onClick={handleDeleteLastRound}
          className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold shadow-md"
        >
          🔙 Undo Last Round
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-xl overflow-x-auto">
        <ScoreTable players={players} scores={scores} />
      </div>
    </div>
  );
};

export default GameBoard;
