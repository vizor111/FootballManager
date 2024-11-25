import { MatchDetails } from "../MatchDetails";

export const goalsScored = (teamName: string, matchHistory: MatchDetails[]) => {
    return matchHistory
      .filter(match => match.team1 == teamName)
      .reduce((prev, current) => { return prev + current.goalsTeam1 }, 0)
      +
      matchHistory
        .filter(match => match.team2 == teamName)
        .reduce((prev, current) => { return prev + current.goalsTeam2 }, 0)
  };

  export const goalsMissed = (teamName: string, matchHistory: MatchDetails[]) => {
    return matchHistory
      .filter(match => match.team1 == teamName)
      .reduce((prev, current) => { return prev + current.goalsTeam2 }, 0)
      +
      matchHistory
        .filter(match => match.team2 == teamName)
        .reduce((prev, current) => { return prev + current.goalsTeam1 }, 0)
  };