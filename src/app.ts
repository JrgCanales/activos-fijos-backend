import express from 'express';
import Connection from './database/connection';
class APP{
    public express: express.Application;
    private connection: Connection | undefined;

    constructor(){
        this.express = express();
        this.db();
    }

    db(){
        this.connection = new Connection();
        this.connection.connection.sync()
        .then(() => {
            console.log(`Database is connected`)
        })
        .catch((error) => {
            console.log(`Error: `,error)
        })
    }

    listen(port: number){
        this.express.listen(port, 
            () => console.log(`Server run in port http://localhost:${port}`)
        );
    }
}

export default new APP();