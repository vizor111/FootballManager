import { useState } from 'react';
import './App.css';
import teams from './teams';

function App() {
  const [selectedTeams, setSelectedTeams] = useState<Record<string, boolean>>(
    teams.reduce((acc, team) => ({ ...acc, [team.Name]: false }), {})
  );

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

  return (
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
  );
}

export default App;
