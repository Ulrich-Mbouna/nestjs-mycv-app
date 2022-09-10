import {Test, TestingModule} from '@nestjs/testing';
import {UsersController} from './users.controller';
import {UsersService} from "./users.service";
import {AuthService} from "./auth.service";
import {User} from "./user.entity";
import {NotFoundException} from "@nestjs/common";

describe('UsersController', () => {
    let controller: UsersController;
    let fakeUsersService: Partial<UsersService>;
    let fakeAuthService: Partial<AuthService>;

    beforeEach(async () => {
        fakeAuthService = {
            // signup: () => {},
            signin: (email: string, password: string) => {
                return Promise.resolve({id: 1, email, password} as User)
            }
        }

        fakeUsersService = {
            findOne: (id: number) => {
                return Promise.resolve({id: id, email: 'test@test.test', password: '1'} as User);
            },
            find: (email: string) => {
                return Promise.resolve([{id: 1, email, password: "1"} as User])
            },
            // remove: () => {},
            // update: () => {}
        }
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                },
                {
                    provide: AuthService,
                    useValue: fakeAuthService
                }
            ]
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('FindAllUsers returns a list of all the users', async () => {
        const users = await controller.findAllUsers('test@test.test');

        expect(users.length).toEqual(1);
        expect(users[0].email).toEqual('test@test.test');
    });

    it('FindUser returns a single user with given id ', async () => {
        const user = await controller.findUser('1');
        expect(user).toBeDefined();
    });
    it('FindUser throw an error if user with given id is not found', async () => {
        fakeUsersService.findOne = () => null;

        await expect(controller.findUser('1')).rejects.toThrow(new NotFoundException('Utilisateur non trouvé'))
    });

    it('Signin updates session object and returns user', async function () {
        const session = {userId: -10};
        const user = await controller.signin({email: 'test@test.test', password: '1'}, session)
        expect(user.id).toEqual(1);
        expect(session.userId).toEqual(1);
    });
});
