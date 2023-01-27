import Match from '../models/MatchModel';
import Team from '../models/TeamModel';
import { totalHomeDraws,
  totalHomeGoals,
  totalHomeLosses, totalHomeTeamPoints,
  totalHomeVictories, totalOwnGoals } from './utils/utils';
import { IleaderBoard } from '../interfaces/LeaderBoardInterface';

export default class LeaderBoardService {
  public getAllMatchesEnded = async () => {
    const matches = await Match.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });

    return matches;
  };

  public leaderboardHome = async (): Promise<IleaderBoard[]> => {
    const matchesEnded = await this.getAllMatchesEnded();
    const allTeams = await Team.findAll();

    const allMatchesHome = allTeams.map((team) => matchesEnded
      .filter((match) => team.id === match.homeTeamId));
    const leaderboardOrder = allMatchesHome.map((team, index) => ({
      name: allTeams[index].teamName,
      totalPoints: team.reduce(totalHomeTeamPoints, 0),
      totalGames: team.length,
      totalVictories: team.reduce(totalHomeVictories, 0),
      totalDraws: team.reduce(totalHomeDraws, 0),
      totalLosses: team.reduce(totalHomeLosses, 0),
      goalsFavor: team.reduce(totalHomeGoals, 0),
      goalsOwn: team.reduce(totalOwnGoals, 0),
      goalsBalance: team.reduce(totalHomeGoals, 0) - team.reduce(totalOwnGoals, 0),
      efficiency: ((team.reduce(totalHomeTeamPoints, 0) / (team.length * 3)) * 100).toFixed(2),
    }));
    return this.orderBoardHome(leaderboardOrder);
  };

  public orderBoardHome = (data:IleaderBoard[]): IleaderBoard[] => {
    const order = data.sort((teamA, teamB) => {
      if (teamB.totalPoints !== teamA.totalPoints) {
        return teamB.totalPoints - teamA.totalPoints;
      }
      if (teamB.totalVictories !== teamA.totalVictories) {
        return teamB.totalVictories - teamA.totalVictories;
      }
      if (teamB.goalsBalance !== teamA.goalsBalance) {
        return teamB.goalsBalance - teamA.goalsBalance;
      }
      return teamB.goalsFavor - teamA.goalsFavor;
    });
    return order;
  };
}
