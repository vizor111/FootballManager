import { HistoryProps } from "../MatchDetails";

const History: React.FC<HistoryProps> = ({ matchHistory }) => {
    return (
        <div className="matchHistory">
            <h3>Match History:</h3>
            <ul>
                {matchHistory.map((match, index) => (
                    <li key={index}>{match.team1} : {match.goalsTeam1} vs {match.team2} : {match.goalsTeam2}</li>
                ))}
            </ul>
        </div>
    )
}

export default History;