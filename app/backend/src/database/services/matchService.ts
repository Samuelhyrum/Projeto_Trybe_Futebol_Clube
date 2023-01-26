import MatchInterface from '../interfaces/matchInterface';
import Match from '../models/MatchModel';
import Team from '../models/TeamModel';

export default class MatchService {
  public getAllMatches = async () => {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  };

  public createMatch = async (data:MatchInterface): Promise<Match> => {
    const newMatch = await Match.create({ ...data,
      inProgress: true });

    return newMatch;
  };

  public finishedMatch = async (id: number) => {
    const matchUpdate = await Match.update({ inProgress: false }, { where: { id } });

    return { status: 200, message: 'Finished', matchUpdate };
  };

  public getTeamById = async (id: number) => {
    const team = await Team.findOne({ where: { id } });

    return team;
  };

  public updateLiveMatches = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const matchLiveUpdate = await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return { status: 200, message: 'VAR CHECK CONFIRMS', matchLiveUpdate };
  };
}
