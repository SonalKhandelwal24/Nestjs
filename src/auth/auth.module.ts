import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { ManagerModule } from 'src/manager/manager.module';
import { AdminModule } from 'src/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
    imports: [UserModule, ManagerModule, AdminModule,
      JwtModule.register({
        secret: 'secret-key',
        signOptions: { expiresIn: '60m' },
      }),
    ],
    controllers: [AuthController],
    providers: [LocalStrategy, JwtStrategy, AuthService], 
    exports: [AuthService]
    
})

export class AuthModule {

  constructor() {
    console.log("Auth module loaded with static JWT secret key.");
    
  }

}
