import { useState, useEffect } from "react";
import ScoreTable from "./ScoreTable";
import Result from "./Result";

const GameBoard = ({ players }) => {
  const [round, setRound] = useState(1);
  const [scores, setScores] = useState([]);
  const [hands, setHands] = useState(["", "", "", ""]);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  useEffect(() => {
    localStorage.setItem(
      "callbreak_game",
      JSON.stringify({ round, scores, hands, isSubmitted })
    );
  }, [round, scores, hands, isSubmitted]);

  const handleInputChange = (index, value) => {
    const updated = [...hands];
    updated[index] = value === "" ? "" : parseInt(value);
    setHands(updated);
  };

  const handleNext = () => {
    const convertedHands = hands.map((val) => (val === "" ? 0 : val));
    setScores([...scores, convertedHands]);
    setHands(["", "", "", ""]);
    setRound((prev) => prev + 1);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
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
        scores={[...scores, hands.map((val) => (val === "" ? 0 : val))]}
        onGoBack={handleGoBack}
      />
    );
  }

  return (
    <div className="p-3 sm:p-6 min-h-screen bg-green-900 text-white font-sans">
      <h2 className="text-xl sm:text-3xl font-bold text-yellow-400 text-center mb-4 sm:mb-8 drop-shadow">
        🃏 Round {round}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6">
        {players.map((player, index) => (
          <div
            key={index}
            className="bg-white text-black rounded-lg p-2 sm:p-4 shadow-md border border-gray-300"
          >
            <label className="block text-center text-sm sm:text-base font-semibold mb-1">
              {player}
            </label>
            <input
              type="number"
              min="0"
              max="13"
              value={hands[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-full px-2 py-1 sm:px-4 sm:py-2 border rounded-md text-center font-bold text-base focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-4 sm:mb-8">
        <button
          onClick={handleNext}
          className="w-full sm:w-auto text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold shadow-md"
        >
          ➕ Next Round
        </button>
        <button
          onClick={handleDeleteLastRound}
          className="w-full sm:w-auto text-sm sm:text-base bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold shadow-md"
        >
          🔙 Undo Last Round
        </button>
         <button
          onClick={handleSubmit}
          className="w-full sm:w-auto text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold shadow-md"
        >
          ✅ Submit Game
        </button>
      </div>

      <div className="bg-white rounded-lg p-3 sm:p-4 shadow-xl overflow-x-auto">
        <ScoreTable players={players} scores={scores} />
      </div>
    </div>
  );
};

export default GameBoard;
