const ScoreTable = ({ players, scores }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-green-700 mt-4">
      <table className="w-full text-sm text-center bg-green-800 text-white table-auto">
        <thead className="bg-green-900 text-yellow-400">
          <tr>
            <th className="border border-green-700 px-3 py-2">Round</th>
            {players.map((player, index) => (
              <th key={index} className="border border-green-700 px-3 py-2">
                {player}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scores.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-green-700" : "bg-green-800"}
            >
              <td className="border border-green-700 px-3 py-2 font-medium">
                {i + 1}
              </td>
              {row.map((hand, j) => (
                <td key={j} className="border border-green-700 px-3 py-2">
                  {hand}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
