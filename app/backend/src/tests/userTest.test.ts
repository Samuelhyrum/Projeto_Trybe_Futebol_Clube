import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel'
import * as UserCrotroller from '../database/controllers/user.controller';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


const tokenTest = {};

const JWTTESTMOCK = {
  "data": {
    "id": 1,
    "username": "Admin",
    "role": "mock",
    "email": "admin@admin.com"
  },
  "iat": 1674257610,
  "exp": 1674344010
}

const tokenMock = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNjc0MjU3NjEwLCJleHAiOjE2NzQzNDQwMTB9.sDnQ6andgd1NzFz4-QCaTt1NHj2MyeGkmIkAolxchCE"

const mockTest = {
    dataValues: {
          id: 1,
          username: 'Samuel',
          role: 'mock',
          email: 'samuel@gmail.com',
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
        }
      }

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

describe('Testando /login/validate', () => {
  let chaiHttpResponse: Response;

  afterEach(()=> {
    (UserModel.findOne as sinon.SinonStub).restore();
    sinon.restore()
  })
  
it('Testando token invalido ', async () => {
  sinon
  .stub(UserModel, "findOne")
  .resolves(
    mockTest as UserModel
  );

  chaiHttpResponse = await chai
    .request(app)
    .get('/login/validate').set('Authorization', tokenMock);
    
  expect(chaiHttpResponse.status).to.equal(401);
});
it('Testando token valido ', async () => {
  sinon
  .stub(UserModel, "findOne")
  .resolves(
    mockTest as UserModel
  );

  sinon
  .stub(jwt, 'verify').resolves(JWTTESTMOCK);

  chaiHttpResponse = await chai
    .request(app)
    .get('/login/validate').set('Authorization', tokenMock);
    
  expect(chaiHttpResponse.status).to.equal(200);

  expect(chaiHttpResponse.body.role).to.equal(mockTest.dataValues.role);
});
it('Testando token valido ', async () => {
  sinon
  .stub(UserModel, "findOne")
  .resolves(
    mockTest as UserModel
  );

  sinon
  .stub(jwt, 'verify').resolves();

  chaiHttpResponse = await chai
    .request(app)
    .get('/login/validate').set('Authorization', '')
    

  expect(chaiHttpResponse.body).to.equal( { message: 'Token not found' } );
});
});