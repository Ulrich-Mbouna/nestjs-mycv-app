const cookieSession = require("cookie-session");
import {ValidationPipe} from "@nestjs/common";

export const setupApp = (app:any) => {

    app.use(cookieSession({
        keys: ['Msus key for cookie']
    }))
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true
    }))
}