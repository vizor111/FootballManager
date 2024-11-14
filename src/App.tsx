import { useState } from 'react';
import './App.css';
import teams from './teams';
import { MatchDetails } from './MatchDetails';

function App() {
  const [selectedTeams, setSelectedTeams] = useState<Record<string, boolean>>(
    teams.reduce((acc, team) => ({ ...acc, [team.Name]: false }), {})
  );
  const [matchHistory, setMatchHistory] = useState<MatchDetails[]>([]);
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
    const result = new MatchDetails(team1, team2, goals1, goals2);

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
          <div className="cell">Goals scored</div>
          <div className="cell">Goals missed</div>
        </div>
        {teams.map((team, index) => (
          <div className={index % 2 === 0 ? 'even-raw' : 'row'} key={index}>
            <div className="cell">{team.Name}</div>
            <div className="cell">{team.Rating}</div>
            <div className="cell">
              <input
                type="checkbox"
                checked={selectedTeams[team.Name]}
                onChange={() => handleCheckboxChange(team.Name)}
              />
            </div>
            <div className="cell">
              {
                matchHistory
                  .filter(match => match.team1 == team.Name)
                  .reduce((prev, current) => { return prev + current.goalsTeam1 }, 0)
                +
                matchHistory
                  .filter(match => match.team2 == team.Name)
                  .reduce((prev, current) => { return prev + current.goalsTeam2 }, 0)
              }
            </div>
            <div className="cell">
            {
                matchHistory
                  .filter(match => match.team1 == team.Name)
                  .reduce((prev, current) => { return prev + current.goalsTeam2 }, 0)
                +
                matchHistory
                  .filter(match => match.team2 == team.Name)
                  .reduce((prev, current) => { return prev + current.goalsTeam1 }, 0)
              }
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
            <li key={index}>{match.team1} : {match.goalsTeam1} vs {match.team2} : {match.goalsTeam2}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
