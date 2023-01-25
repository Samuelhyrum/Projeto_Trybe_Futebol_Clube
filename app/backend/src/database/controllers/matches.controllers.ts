import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public getAllTeams = async (_req: Request, res: Response) => {
    const returnAllMatches = await this.matchService.getAllMatches();

    return res.status(200).json(returnAllMatches);
  };
}
