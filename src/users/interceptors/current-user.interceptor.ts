/*
Afin de mettre en place la possibilité pour l'application de savoir lorsque un utilisateru
est connecté, on a opté pour utilisé un decorateur pour retourner l'utilisateur
connecté, et pour cela on a prévu utilisé un décorrateur de paramètre:
Or ce décorateur de paramètre aimerai utilisé une fonction du userService pou trouver l'utilisateur en BD,
et puisque ce dernier service est dans le DI de Nest, le décorateur qui s"exécute hors de ce DI
n'a donc pas accèes à l'instance unique de UserService.
On a donc opté pour faire un intercepteur qui lui sera dans le DI , recevra les données
de la session et l'instance de UserService afin d'exposé le résultat aux décorateur qui aimerait l'utiliser.
 */

import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";

import {UsersService} from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) {
    }

    async intercept(context: ExecutionContext, handler: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();
        const {userId} = request.session;

        if (userId) {
            const user = await this.usersService.findOne(userId);
            request.currentUser = user;
        }

        return handler.handle();
    }

}