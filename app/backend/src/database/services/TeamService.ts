import Team from '../models/TeamModel';

export default class TeamService {
  public getAllTeams = async () => {
    const teams = await Team.findAll();

    return teams;
  };
}
