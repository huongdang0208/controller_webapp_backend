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
    app.listen(8000);
    await app.init();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      it('should sing up', () => {
        const dto: AuthDTO = {
          email: 'anne@gmail.com',
          password: '12234',
        };
        return pactum
          .spec()
          .post('http://localhost:8000/auth/singup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Signin', () => {
      it('should sing in', () => {
        const dto: AuthDTO = {
          email: 'anne@gmail.com',
          password: '12234',
        };
        return pactum
          .spec()
          .post('http://localhost:8000/auth/singin')
          .withBody(dto)
          .expectStatus(201);
      });
    });
  });

  afterAll(() => {
    app.close();
  });
});
