import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AppDataSource } from "../typeOrm.config";
import { TypeOrmModule } from "@nestjs/typeorm";

describe('Authentication Systsème (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
              AppModule,
              TypeOrmModule.forRoot(AppDataSource.options),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('handles a signup request', () => {
        const emailO = 'test@test10.test';
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send({ email:emailO, password: '2'})
            .expect(201)
            .then((res) => {
                const { id, email } = res.body;
                expect(id).toBeDefined();
                expect(email).toEqual(emailO)
            })
    });

    it('signup as a new user then get the current logged in user ', async ()=> {
        const emailO = 'test@test30.test';

        const res = await request(app.getHttpServer())
            .post('/auth/signup')
            .send({ email: emailO, password:'1'})
            .expect(201)

        const cookie = res.get('Set-Cookie')

        const { body } = await request(app.getHttpServer())
            .get('/auth/whoiam')
            .set('Cookie', cookie)
            .expect(200)

        expect(body.email).toEqual(emailO);

    })
});
