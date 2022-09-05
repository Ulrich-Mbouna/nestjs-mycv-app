import {createParamDecorator, ExecutionContext} from "@nestjs/common";

/*
Décorateur de paramètre pour retourner l'utilisateur présentement connecté
Cela utilise un instercepteur en among pour jouer sur le système de DI afin de retourner
l'instance de l'utilisateur en cours
 */
export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.currentUser;
    }
)