import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { Category } from '../models/category';

dotenv.config();

export const conn : Sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false
});

/* export default class Connection{
    public connection: Sequelize;

    constructor(){
        dotenv.config();

        this.connection = new Sequelize({
            dialect: "postgres",
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            //  port: 5432
            logging: false,
            /* models: [
                Category
            ] 
        });
    }
} */