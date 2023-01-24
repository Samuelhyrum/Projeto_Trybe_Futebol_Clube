import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel'
import UserCrotroller from '../database/controllers/user.controller';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


const tokenTest = {};


describe('Testando /login', () => {
  
  let chaiHttpResponse: Response;
    
    afterEach(()=> {
      (UserModel.findOne as sinon.SinonStub).restore();
      sinon.restore()
    })
    
    const nweUser = {
      'email': 'samuel@gmail.com',
      'password': 'password'
    }

    const userInvalid = {
      'password': 'password'
    }

    const emailInvalid = {
      'email': 'samuel@gmail.com',
      'password': 'password'
    }
    const mockTest = {
        dataValues: {
              id: 1,
              username: 'Samuel',
              role: 'mock',
              email: 'samuel@gmail.com',
              password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
            }
          }


  it('Testando novo usuario', async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(
        mockTest as UserModel
      );

    sinon
      .stub(bcrypt, 'compareSync')
      .returns(true);

    sinon
      .stub(jwt, 'sign')
      .resolves(tokenTest)

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(nweUser)
      
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body.token).to.deep.equal(tokenTest)
  });

  it('Testando sem email', async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves();


    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userInvalid)
      
    expect(chaiHttpResponse.status).to.equal(400);
  });

  it('Testando email incorreto ', async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves();


    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(emailInvalid)
      
    expect(chaiHttpResponse.status).to.equal(401);
  });

  it('Testando password incorreto ', async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(
        mockTest as UserModel
      );
      sinon
      .stub(bcrypt, 'compareSync')
      .returns(false);

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(emailInvalid)
      
    expect(chaiHttpResponse.status).to.equal(401);
  });

});

describe('Testando /login', () => {
  let chaiHttpResponse: Response;
  
it('Testando token ', async () => {

  chaiHttpResponse = await chai
    .request(app)
    .get('/login/validate')
    
  expect(chaiHttpResponse.status).to.equal(401);
});
});