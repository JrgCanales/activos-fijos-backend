import express from 'express';

class APP{
    public express: express.Application;

    constructor(){
        this.express = express();
    }

    listen(port: number){
        this.express.listen(port, 
            () => console.log(`Server run in port http://localhost:${port}`)
        );
    }
}

export default new APP();