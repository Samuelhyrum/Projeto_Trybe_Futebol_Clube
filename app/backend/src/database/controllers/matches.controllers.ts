import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public getAllTeams = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    const returnAllMatches = await this.matchService.getAllMatches();

    if (!inProgress) {
      return res.status(200).json(returnAllMatches);
    }

    if (inProgress === 'true') {
      const matchesLives = returnAllMatches
        .filter((match) => match.inProgress === true);
      return res.status(200).json(matchesLives);
    }

    if (inProgress === 'false') {
      const matchesEnd = returnAllMatches
        .filter((match) => match.inProgress === false);
      return res.status(200).json(matchesEnd);
    }
  };

  public createNewMatch = async (req: Request, res: Response) => {
    const { body } = req;
    const { decoded } = req.body;

    const matchCreated = await this.matchService.createMatch(body);

    if (typeof decoded !== 'string') {
      return res.status(201).json(matchCreated);
    }
  };
}
