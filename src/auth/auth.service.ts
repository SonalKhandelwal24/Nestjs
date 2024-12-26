import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService : JwtService ) {}

    //id card
    generateToken(payload : User) : string {
        return this.jwtService.sign(payload);
    }   
    
}


