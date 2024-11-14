export class MatchDetails {
    team1: string;
    team2: string;
    goalsTeam1: number;
    goalsTeam2: number;

    constructor(team1: string, team2: string, goalsTeam1: number, goalsTeam2: number) {
        this.team1 = team1;
        this.team2 = team2;
        this.goalsTeam1 = goalsTeam1;
        this.goalsTeam2 = goalsTeam2;
    }
}