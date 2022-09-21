import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "sqlite",
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
    migrations: [__dirname + "/../database/migrations/*.{js,ts}"],
    database: 'dbsqlite',
    // cli: {
    //     migrationsDir:  __dirname + "/../database/migrations"
    // },
    extra: {
        charset: "utf8mb4_unicode_ci",
    },
    synchronize: true,
}