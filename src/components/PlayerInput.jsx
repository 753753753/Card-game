import { useState, useEffect } from "react";

const PlayerInput = ({ onStart }) => {
  const [names, setNames] = useState(["", "", "", ""]);

  // ✅ Load saved player names on initial load
  useEffect(() => {
    const savedNames = localStorage.getItem("callbreak_players");
    if (savedNames) {
      setNames(JSON.parse(savedNames));
    }
  }, []);

  const handleChange = (index, value) => {
    const updated = [...names];
    updated[index] = value;
    setNames(updated);
  };

  const handleStart = () => {
    if (names.every((name) => name.trim() !== "")) {
      // ✅ Save to localStorage before starting the game
      localStorage.setItem("callbreak_players", JSON.stringify(names));
      onStart(names);
    } else {
      alert("Please enter all 4 player names.");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-no-repeat bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url("/bg.jpg")` }}
    >
      {/* Overlay */}
      <div className="inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="relative z-10 flex flex-col items-center gap-5 p-6 sm:p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 w-[90%] max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">
          Welcome to the Game
        </h1>
        <p className="text-base sm:text-lg text-gray-200 mb-2 text-center">
          Enter Player Names to Start
        </p>

        {names.map((name, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Player ${index + 1} Name`}
            value={name}
            onChange={(e) => handleChange(index, e.target.value)}
            className="px-4 py-2 rounded w-full bg-white/90 text-black placeholder-gray-600 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}

        <button
          onClick={handleStart}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default PlayerInput;
