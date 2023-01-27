import * as express from 'express';
import UserCrotroller from './database/controllers/user.controller';
import TeamCrontroller from './database/controllers/teams.controller';
import MatchController from './database/controllers/matches.controllers';
import Middleware from './database/middlewares/jwtMiddleware';
import LeaderBoarController from './database/controllers/leaderBoardController';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota

    const user = new UserCrotroller();
    const team = new TeamCrontroller();
    const match = new MatchController();
    const tokenVerify = new Middleware();
    const leaderboard = new LeaderBoarController();

    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', user.login);
    this.app.get('/login/validate', tokenVerify.validateJwt, user.validateToken);
    this.app.get('/teams', team.getAllTeams);
    this.app.get('/teams/:id', team.getTeamById);
    this.app.get('/matches', match.getAllTeams);
    this.app.post('/matches', tokenVerify.validateJwt, match.createNewMatch);
    this.app.patch('/matches/:id/finish', match.updateMatch);
    this.app.patch('/matches/:id', match.updateLiveMatch);
    this.app.get('/leaderboard/home', leaderboard.getLeaderBoardOrder);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
