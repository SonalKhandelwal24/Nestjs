import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ResetToken, ResetTokenSchema } from './schemas/reset-token.schema';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{
    name: ResetToken.name,
    schema: ResetTokenSchema,
  }])
    , PassportModule,
  JwtModule.register({
    secret: "key",
    signOptions: {
      expiresIn: "60s"
    }
  }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})

export class AuthModule { }

