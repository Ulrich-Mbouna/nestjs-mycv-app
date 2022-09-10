import {Test,} from "@nestjs/testing";
import {AuthService} from "./auth.service";
import {UsersService} from "./users.service";
import {User} from "./user.entity";
import {BadRequestException} from "@nestjs/common";

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        //Create a fake copy of usersService
        const users: User[] = [];
        fakeUsersService = {
            find: (email: string) => {
                const filteredUser = users.filter(user => user.email === email);
                return Promise.resolve(filteredUser);
            },
            create: (email: string, password: string) => {
                const user = {id: Math.floor(Math.random() * 999999), email, password} as User;
                users.push(user);
                return Promise.resolve(user);
            }
        }
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ]
        }).compile()

        service = module.get(AuthService)
    })

    it('Can create an instance of auth service',
        async () => {
            expect(service).toBeDefined()
        });

    it('Create a new user with a salted and hashed password', async () => {
        const user = await service.signup('test@test.test', 'asdf');

        expect(user.password).not.toEqual('asdf');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    })

    it('Throw and error if user signup with email already in use', async () => {
        await service.signup('test@test.test', '1');
        await expect(service.signup('test@test.test', '1')).rejects.toThrow(new BadRequestException('Utilisateur déjà existant'))
    })

    it('Throws an error if sigin is call with unsused email', async () => {
        await expect(service.signin('test@test.test', '1')).rejects.toThrow(new BadRequestException('Utilisateur non trouvé!'))
    })

    it("Throws if an invalid password is provided", async () => {
        await service.signup('test@test.test', '1')
        await expect(service.signin('test@test.test', '4')).rejects.toThrow(new BadRequestException('Le mot de passe saisie est incorrect!!!'))
    })

    it('Returns a user if correct password is provided', async () => {
        await service.signup('test@test.test', '1');
        const user = await service.signin('test@test.test', '1');

        expect(user).toBeDefined();
    });
});