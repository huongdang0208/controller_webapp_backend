// import { Test, TestingModule } from '@nestjs/testing';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// describe('AppController', () => {
//   let appController: AppController;

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [AppController],
//       providers: [AppService],
//     }).compile();

//     appController = app.get<AppController>(AppController);
//   });

//   describe('root', () => {
//     it('should return "Hello World!"', () => {
//       expect(appController.getHello()).toBe('Hello World!');
//     });
//   });
// });
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { AuthDTO } from 'src/auth/data-transfer-object';

describe('End-to-end testing', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(8000);
  });

  describe('Auth', () => {
    describe('Signup', () => {
      it('should sing up', async () => {
        const dto: AuthDTO = {
          email: 'vladimirabc@gmail.com',
          password: '12234',
        };
        return pactum
          .spec()
          .post('http://localhost:8000/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Signin', () => {
      it('should sing in', () => {
        const dto: AuthDTO = {
          email: 'anne123@gmail.com',
          password: '12234',
        };
        return pactum
          .spec()
          .post('http://localhost:8000/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('token', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('get me', () => {
      it('get me', () => {
        return pactum
          .spec()
          .get('http://localhost:8000/user/profile')
          .withHeaders({
            Authorization: `Bearer $S{token}`,
            ContentType: 'application/json',
          })
          .expectStatus(200);
      });
    });
    describe('update me', () => {
      it('update  me', () => {
        const dto = {
          email: 'vladimir123@gmail.com',
          firstName: 'vladimir',
          lastName: 'putin',
        };
        return pactum
          .spec()
          .patch('http://localhost:8000/user/update')
          .withHeaders({
            Authorization: `Bearer $S{token}`,
            ContentType: 'application/json',
          })
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });

  afterAll(() => {
    app.close();
  });
});
