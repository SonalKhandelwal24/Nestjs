import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';  // Use bcrypt for password hashing
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import { InjectModel } from '@nestjs/mongoose';
import { ResetToken, ResetTokenDocument } from './schemas/reset-token.schema';
import { Model } from 'mongoose';
import { EmailData, EmailService } from 'src/service/mail.service';

@Injectable()
export class AuthService {
    getUserPermissions(userId: any) {
        throw new Error('Method not implemented.');
    }

    constructor(
        @InjectModel(ResetToken.name) private ResetTokenModel: Model<ResetTokenDocument>,
        private jwtService: JwtService,
        private userService: UserService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatches = await this.comparePasswords(password, user.password);
        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }

    async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }


    async generateAccessToken(userId: string, role:string) {
        const paylaod = { userId, role }
        console.log("payload " ,paylaod);
        const accessToken = this.jwtService.sign( paylaod , {expiresIn: '2h'});
        return accessToken;
    }

    async generateRefreshToken(userId: string) {
        const refreshToken = uuidv4();
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);

        await this.ResetTokenModel.create({
            token: refreshToken,
            userId,
            expiryDate,
        });
        return refreshToken;
    }

    async changePassword(userId, oldPassword: string, newPassword: string) {
        //Find the user
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new NotFoundException('User not found...');
        }

        //Compare the old password with the password in DB
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Wrong credentials');
        }

        //Change user's password
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = newHashedPassword;
        await user.save();
    }

    async forgotPassword(email: string) {
        // Find the user by email
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new NotFoundException("User not found");
        }

        if (user) {
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const resetToken = nanoid(64);
            await this.ResetTokenModel.create({
                token: resetToken,
                userId: user._id,
                expiryDate,
            })

            const resetLink = `http://192.168.1.64:3001/auth/reset-password?token=${resetToken}`;
            const emailData: EmailData = {
                from:'testing@testing.fwmspl.com',   // Change to your "from" email address
                email: email,                // Send to the user's email
                subject: 'Password Reset Request',
                message: `Hello, please use the following link to reset your password: ${resetLink}`, // Plain text message
                html: `<p>Hello,</p><p>Please use the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`, // HTML content
            };
            console.log(emailData);
            console.log(resetLink);
            // Send the email using the emailService
            try {
                const response = await EmailService(emailData);
                console.log(response);
            } catch (error) {
                console.error('Failed to send password reset email:', error.message);
            }
        }
    }

    async resetPassword(resettoken: string, newPassword: string) 
    {
        const token = await this.ResetTokenModel.findOne({ token: resettoken, expiryDate: { $gte: new Date() } });
        if (!token) {
            throw new UnauthorizedException('Invalid link');
        }

        // Change password 
        const user = await this.userService.findOne(token.userId);
        if (!user) {
            throw new InternalServerErrorException();
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
    }

}