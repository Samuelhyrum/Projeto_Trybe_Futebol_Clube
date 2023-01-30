import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboardService';

export default class LeaderBoarController {
  constructor(private leadService = new LeaderBoardService()) {}

  public getLeaderBoardOrderHome = async (_req: Request, res: Response) => {
    const returnOrderTheLeaderBoard = await this.leadService.leaderboardHome();
    return res.status(200).json(returnOrderTheLeaderBoard);
  };

  public getLeaderBoardOrderAway = async (_req: Request, res: Response) => {
    const leaderboardAway = await this.leadService.leaderboardAway();
    return res.status(200).json(leaderboardAway);
  };

  public getLeaderBoardOrderAll = async (_req: Request, res: Response) => {
    const leaderboardAway = await this.leadService.AllLeaderBoard();
    return res.status(200).json(leaderboardAway);
  };
}
