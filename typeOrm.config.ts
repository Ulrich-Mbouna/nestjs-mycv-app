import {DataSource, DataSourceOptions} from "typeorm";
import { config } from "dotenv";

config();


const dbConfig = {
    synchronize: false,
    migrations: ["migrations/*.ts"],
    cli: {
        migrationsDir: './src/migrations'
    }
};

switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['**/*.entity.js'],
        })
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.ts'],
        })
        break;
    case 'production':
        break;
    default:
        throw new Error('Environement non réconnu !!!')
}

export default new DataSource(dbConfig as unknown as DataSourceOptions)