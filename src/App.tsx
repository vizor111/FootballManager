import { useState } from 'react';
import './App.css';
import teams from './teams';

function App() {
  const [selectedTeams, setSelectedTeams] = useState<Record<string, boolean>>(
    teams.reduce((acc, team) => ({ ...acc, [team.Name]: false }), {})
  );
  const [matchHistory, setMatchHistory] = useState<string[]>([]);
  const [playedMatches, setPlayedMatches] = useState<Set<string>>(new Set());

  const handleCheckboxChange = (teamName: string) => {
    const selectedCount = Object.values(selectedTeams).filter(Boolean).length;
    const isCurrentlySelected = selectedTeams[teamName];

    if (!isCurrentlySelected && selectedCount >= 2)
      return;

    setSelectedTeams((prevState) => ({
      ...prevState,
      [teamName]: !prevState[teamName]
    }));
  };

  const handlePlayMatch = () => {
    const selected = Object.keys(selectedTeams).filter((team) => selectedTeams[team]);
    if (selected.length !== 2) {
      alert("Select two teams to play a match!");
      return;
    }

    const [team1, team2] = selected.sort();
    const matchKey = `${team1} vs ${team2}`;

    if (playedMatches.has(matchKey)) {
      alert("These teams have already played each other!");
      return;
    }

    const goals1 = Math.floor(Math.random() * 5);
    const goals2 = Math.floor(Math.random() * 5);
    const result = `${team1} ${goals1} : ${goals2} ${team2}`;

    setMatchHistory((prev) => [...prev, result]);
    setPlayedMatches((prev) => new Set(prev).add(matchKey));

    setSelectedTeams(teams.reduce((acc, team) => ({ ...acc, [team.Name]: false }), {}));
  };

  return (
    <div>
      <div className="table">
        <div className="row heading">
          <div className="cell">Team</div>
          <div className="cell">Rating</div>
          <div className="cell">Selector</div>
        </div>
        {teams.map((team, index) => (
          <div className="row" key={index}>
            <div className="cell">{team.Name}</div>
            <div className="cell">{team.Rating}</div>
            <div className="cell">
              <input
                type="checkbox"
                checked={selectedTeams[team.Name]}
                onChange={() => handleCheckboxChange(team.Name)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className='playMatchBtn'>
        <button onClick={handlePlayMatch}>Play</button>
      </div>
      <div className="matchHistory">
        <h3>Match History:</h3>
        <ul>
          {matchHistory.map((match, index) => (
            <li key={index}>{match}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
