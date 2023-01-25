import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamCrontroller {
  constructor(private teamService = new TeamService()) {}

  public getAllTeams = async (_req: Request, res: Response) => {
    const returnAll = await this.teamService.getAllTeams();

    return res.status(200).json(returnAll);
  };

  public getTeamById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    const teamBYId = await this.teamService.getTeamById(id);

    return res.status(200).json(teamBYId);
  };
}
