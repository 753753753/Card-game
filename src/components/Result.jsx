const Result = ({ players, scores, onGoBack }) => {
  const totals = players.map((_, index) =>
    scores.reduce((sum, round) => sum + (round[index] || 0), 0)
  );

  const ranked = [...players].map((name, i) => ({
    name,
    total: totals[i],
  }));

  ranked.sort((a, b) => b.total - a.total);

  const lastPlayer = ranked[ranked.length - 1];

  const rankColors = [
    "bg-yellow-400 text-black",
    "bg-gray-400 text-black",
    "bg-orange-500 text-white",
  ];

  return (
    <div className="p-6 min-h-screen bg-green-900 text-white flex flex-col items-center">
      <div className="w-full flex justify-start mb-4">
        <button
          onClick={onGoBack}
          className="bg-white text-green-900 px-4 py-2 rounded-full font-bold hover:bg-yellow-400"
        >
          ⬅️ Go Back
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-yellow-300 drop-shadow-lg">
        🏆 Final Results
      </h2>

      <div className="w-full max-w-md space-y-4">
        {ranked.map((player, index) => (
          <div
            key={index}
            className={`flex justify-between items-center px-5 py-3 rounded-lg shadow-xl border border-green-700 transform transition hover:scale-105 ${
              rankColors[index] || "bg-green-800"
            } ${index === 0 ? "animate-pulse" : ""}`}
          >
            <span className="font-semibold text-lg">
              {index === 0 && "🥇 "}
              {index === 1 && "🥈 "}
              {index === 2 && "🥉 "}
              {index + 1}ᵗʰ — {player.name}
            </span>
            <span className="font-bold text-xl">{player.total} pts</span>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-green-800 px-6 py-4 rounded-xl border border-yellow-400 shadow-lg text-center animate-bounce">
        <p className="text-lg font-semibold text-yellow-300">
          🤭 {lastPlayer.name} sabko <span className="text-white font-bold">chai ☕</span> pilayega!
        </p>
        <p className="text-sm text-gray-300 mt-1">Next time better luck 😜</p>
      </div>
    </div>
  );
};

export default Result;
