import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {

  private readonly roles : string[];
  //admin, user
  constructor(role: string[]) {
   this.roles = role ;
  }

  canActivate( context: ExecutionContext ): boolean {
   
    const ctx = context.switchToHttp();
    const request : any= ctx.getRequest<Request>();
    const user = request.user;

    // console.log(user);
    
    if (!user || !user.role) {
      return false;
    }

    console.log("USER " + user);
    //user,admin,manager
    return user.role.filter((role: string) => this.roles.includes(role));
  }
  
}
