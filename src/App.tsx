import { useState } from 'react';
import './App.css';
import teams from './teams';
import { MatchDetails } from './MatchDetails';
import History from './HistoryComponent';

import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';

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

  const goalsScored = (teamName: string) => {
    return matchHistory
      .filter(match => match.team1 == teamName)
      .reduce((prev, current) => { return prev + current.goalsTeam1 }, 0)
      +
      matchHistory
        .filter(match => match.team2 == teamName)
        .reduce((prev, current) => { return prev + current.goalsTeam2 }, 0)
  };

  const goalsMissed = (teamName: string) => {
    return matchHistory
      .filter(match => match.team1 == teamName)
      .reduce((prev, current) => { return prev + current.goalsTeam2 }, 0)
      +
      matchHistory
        .filter(match => match.team2 == teamName)
        .reduce((prev, current) => { return prev + current.goalsTeam1 }, 0)
  };

  return (
    <div>
      <Grid data={teams}>
        <Column field="Name" title="Team" />
        <Column field="Rating" title="Rating" />
        <Column field="Rating" title="Rating" />
        <Column
          title="Select team"
          cell={(props) => (
            <td>
              <input
                type="checkbox"
                checked={selectedTeams[props.dataItem.Name]}
                onChange={() => handleCheckboxChange(props.dataItem.Name)}
              />
            </td>
          )}
        />
        <Column
          title="Goals scored"
          cell={(props) => (
            <td>
              {goalsScored(props.dataItem.Name)}
            </td>
          )}
        />
        <Column
          title="Goals missed"
          cell={(props) => (
            <td>
              {goalsMissed(props.dataItem.Name)}
            </td>
          )}
        />
      </Grid>

      <div>
        <div className='playMatchBtn'>
          <button onClick={handlePlayMatch}>Play</button>
        </div>
      </div>

      <History matchHistory={matchHistory} />
    </div>
  );
}

export default App;