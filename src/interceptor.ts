import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  constructor(
    private jwtService: JwtService, // For handling JWT tokens
    private userService: UserService, // Service to fetch the user
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {

    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    
    const refreshToken =  req.cookies['refreshToken'];

    // If there is no refresh token, proceed with the request (user might not be logged in)
    if (!refreshToken) {
      return next.handle();
    }

    // Decode the refresh token
    try {
      const decodedToken = this.jwtService.verify(refreshToken); // Throws if the token is invalid/expired
      const expiryDate = decodedToken.exp;

      // Check if the token is expired
      if (Date.now() >= expiryDate * 1000) 
      { 
        const user = await this.userService.findOne(decodedToken.userId);
      
        if (!user) {
          throw new UnauthorizedException('User not found');
        }

        const newRefreshToken = await this.generateRefreshToken(user._id);

        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days
        });
      }

      return next.handle();
      
    } catch (error) {
      // If the token is expired or invalid, continue to regenerate it
      if (error.name === 'TokenExpiredError') {
        // Handle token regeneration here (this is already handled above)
        return next.handle();
      } else {
        throw new UnauthorizedException('Invalid refresh token');
      }
    }
  }

  async generateRefreshToken(userId: string): Promise<string> {
    // Create a new refresh token, you can adjust the expiry time as needed
    const refreshToken = this.jwtService.sign(
      { userId }, // Payload
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' } // Refresh token expires in 7 days
    );
    return refreshToken;
  }
}
