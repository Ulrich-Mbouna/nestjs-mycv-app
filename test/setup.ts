import { rm } from 'fs/promises';
import { join } from 'path';
import { AppDataSource } from "../typeOrm.config";

global.beforeEach( async () => {
    try {
        await rm(join(__dirname, '..', 'test.sqlite'));
    }
    catch (err){}
})

global.afterEach( async () => {
    try {
        await AppDataSource.destroy();
    }
    catch (err){}
})
global.afterAll(async () => {
// your code here
// your code here
}, 100000);