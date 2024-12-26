import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"
import { AuthService } from "./auth.service"
import { Manager } from "src/manager/entities/manager.entity";
import { Admin } from "src/admin/entities/admin.entity";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
 
    constructor(
        private readonly authService : AuthService,
    ) {
        super({
            usernameField : 'email'
        })
    }

    async validate(email : string, password : string) : Promise <User | Admin | Manager> {

        const user =  this.authService.getUserByName(email);

        if(!user || user.password !== password) {
            throw new UnauthorizedException('Invalid email and password')
        }
        
        return user;        
    }

}