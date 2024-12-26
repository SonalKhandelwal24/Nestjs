import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/admin/entities/admin.entity';
import { Manager } from 'src/manager/entities/manager.entity';
import { User } from 'src/user/entities/user.entity';
import { Role } from './ROLE';

type AuthEntity = User | Admin | Manager;

@Injectable()
export class AuthService {

    constructor(private readonly jwtService : JwtService) {}

    public users: AuthEntity[] = [

        // user info********
        {
            username: 'user1',
            password: 'user123',
            email: 'user1@gmail.com',
            age: 23,
            role: [Role.ROLES.ADMIN, Role.ROLES.USER],
        },
        {
            username: 'user2',
            password: 'user456',
            email: 'user2@gmail.com',
            age: 21,
            role: [Role.ROLES.USER],
        },
        {
            username: 'user3',
            password: 'user789',
            email: 'user3@gmail.com',
            age: 22,
            role: [Role.ROLES.USER],
        },
    
        // maanger info********
        {
            managername: 'manager1',
            password: 'manager123',
            email: 'manager1@gmail.com',
            age: 38,
            role: [Role.ROLES.ADMIN, Role.ROLES.MANAGER],
            department: 'Data Analyst',
            teamSize: 40,
        },
        {
            managername: 'manager2',
            password: 'manager456',
            email: 'manager2@gmail.com',
            age: 40,
            role: [Role.ROLES.MANAGER],
            department: 'Software Engineering',
            teamSize: 50,
        },
       
        //admin info********
        {
            adminname: 'admin1',
            password: 'admin123',
            email: 'admin1@gmail.com',
            age: 24,
            role: [ Role.ROLES.ADMIN, Role.ROLES.USER],
            permissions: ['manage_users'],
            lastLogin: new Date(),
        },
        {
            adminname: 'admin2',
            password: 'admin456',
            email: 'admin2@gmail.com',
            age: 22,
            role: [ Role.ROLES.ADMIN],
            permissions: ['manage_users', 'view_reports'],
            lastLogin: new Date(),
        }
    ];

     // Fetch all users with a name
    getUserByName (email: string) : AuthEntity {
        return this.users.find((user) => user.email === email)
    }

    //id card
    async generateToken(payload : any ) {
        const token = await this.jwtService.signAsync(payload)
        console.log("Generated token : ", token);
        return token;
    }

    async signIn(email: string, password: string): Promise<{ access_token: string }> {
        const user = this.getUserByName(email);
        if(!user || user.password !== password) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const payload = { username: user.email, sub: user.role };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
    }

}
 