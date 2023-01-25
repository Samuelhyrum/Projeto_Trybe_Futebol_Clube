import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const allTeamsMock = [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    },
    {
      "id": 3,
      "teamName": "Botafogo"
    },
    {
      "id": 4,
      "teamName": "Corinthians"
    },
    {
      "id": 5,
      "teamName": "Cruzeiro"
    },
    {
      "id": 6,
      "teamName": "Ferroviária"
    },
    {
      "id": 7,
      "teamName": "Flamengo"
    },
    {
      "id": 8,
      "teamName": "Grêmio"
    },
    {
      "id": 9,
      "teamName": "Internacional"
    },
    {
      "id": 10,
      "teamName": "Minas Brasília"
    },
    {
      "id": 11,
      "teamName": "Napoli-SC"
    },
    {
      "id": 12,
      "teamName": "Palmeiras"
    },
    {
      "id": 13,
      "teamName": "Real Brasília"
    },
    {
      "id": 14,
      "teamName": "Santos"
    },
    {
      "id": 15,
      "teamName": "São José-SP"
    },
    {
      "id": 16,
      "teamName": "São Paulo"
    }
  ]

const interMock = {
    "id": 9,
    "teamName": "Internacional"
  }

describe('Testando /teams', () => {
  
    let chaiHttpResponse: Response;
      
      afterEach(()=> {
        (Team.findAll as sinon.SinonStub).restore();
        sinon.restore()
      })
    
  
    it('Testando resposta na GET/TEAMS', async () => {
      sinon
        .stub(Team, "findAll")
        .resolves(
          allTeamsMock as Team[]
        );
  
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams')
        
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(allTeamsMock)
    });

});
describe('Testando /teams/:id', () => {
  
    let chaiHttpResponse: Response;
      
      afterEach(()=> {
        (Team.findOne as sinon.SinonStub).restore();
        sinon.restore()
      })
    
  
    it('Testando resposta na GET/TEAMS/:ID', async () => {
      sinon
        .stub(Team, "findOne")
        .resolves(
          interMock as Team
        );
  
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/9')
        
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(interMock)
    });

});