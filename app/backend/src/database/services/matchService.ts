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
}
