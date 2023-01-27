import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboardService';

export default class LeaderBoarController {
  constructor(private leadService = new LeaderBoardService()) {}

  public getLeaderBoardOrder = async (_req: Request, res: Response) => {
    const returnOrderTheLeaderBoard = await this.leadService.leaderboardHome();
    return res.status(200).json(returnOrderTheLeaderBoard);
  };
}
