import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ManagerMiddleware implements NestMiddleware {

  private readonly logger = new Logger(ManagerMiddleware.name);

  use(req: any, res: any, next: () => void) {

    const protocol = req.protocol;   //http, https
    const host = req.get('host');    //localhost
    const url = req.url;
    const method = req.method;
    const date = new Date().toDateString();

    this.logger.log(`${protocol}://${host}${url}, ${method}, ${date}`);
    this.logger.log("This is a Manager Page");
    
    next();
  }
}
