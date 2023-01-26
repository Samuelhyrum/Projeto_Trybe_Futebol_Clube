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

    const homeTeamExist = await this.matchService.getTeamById(body.homeTeamId);
    const awayTeamExist = await this.matchService.getTeamById(body.awayTeamId);

    if (body.homeTeamId === body.awayTeamId) {
      return res.status(422).json({ message:
        'It is not possible to create a match with two equal teams' });
    }

    if (!homeTeamExist || !awayTeamExist) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const matchCreated = await this.matchService.createMatch(body);

    if (typeof decoded !== 'string') {
      return res.status(201).json(matchCreated);
    }
  };

  public updateMatch = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    const { status, message } = await this.matchService.finishedMatch(id);

    return res.status(status).json({ message });
  };
}
