export default interface MatchInterface {
  id: number,
  homeTeamId: string,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: string,
  homeTeam: teamName,
  awayTeam: awayTeam,
}

type teamName = {
  teamName: string,
};

type awayTeam = {
  teamName: string,
};
