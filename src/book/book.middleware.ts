import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class BookMiddleware implements NestMiddleware 
{
    private readonly logger = new Logger(BookMiddleware.name);

    use(req : Request , res : Response, next : NextFunction)
    {
        let protocol = req.protocol;    //http, https
        let host = req.get('host');     //localhost
        let url = req.originalUrl;      //url
        let method = req.method;
        let date = new Date().toDateString();

        this.logger.log(`${protocol}://${host}${url} ${method} ${date}`);
        
        // console.log("This is a class based middleware implements book module");
        next();
    }

}