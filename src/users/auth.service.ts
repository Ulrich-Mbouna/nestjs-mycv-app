import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {UsersService} from "./users.service";
import {randomBytes, scrypt as _scrypt} from "crypto";
import {promisify} from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {
    }

    async signup(email: string, password: string) {
        const users = await this.usersService.find(email);

        if (users.length) {
            throw new BadRequestException('Utilisateur déjà existant');
        }

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');

        return this.usersService.create(email, result);
    }

    async signin(email: string, password: string) {
        const [user] = await this.usersService.find(email);

        if (!user) {
            throw new NotFoundException(('Utilisateur non trouvé!'))
        }

        const [salt, passHashed] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (hash.toString('hex') !== passHashed)
            throw new BadRequestException('Le mot de passe saisie est incorrect!!!');

        return user;
    }
}