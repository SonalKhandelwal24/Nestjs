import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class UserMiddleware implements NestMiddleware {

  private readonly logger = new Logger(UserMiddleware.name);

  use(req: any, res: any, next: () => void) {

    const protocol = req.protocol;
    const host = req.get('host');
    const url = req.url;
    const method = req.method;
    const date = new Date().toDateString();
    const time = new Date().toTimeString();
    
    this.logger.log(`${protocol}://${host}${url}, ${method}, ${date}, ${time}`)
    this.logger.log("This is a User Page");
    
    next();
  }
}






   
