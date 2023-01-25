import TeamInterface from '../interfaces/teamInterface';
import Team from '../models/TeamModel';

export default class TeamService {
  public getAllTeams = async (): Promise<TeamInterface[]> => {
    const teams = await Team.findAll();

    return teams;
  };

  public getTeamById = async (id: number) => {
    const team = await Team.findOne({ where: { id } });

    return team;
  };
}
