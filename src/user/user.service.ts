import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel : Model<UserDocument>) {}

  private readonly saltRounds = 10;

  // Hashing password using bcrypt
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async updateRefreshToken(userId: string, hashedRefreshToken: string): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, { hashedRefreshToken });
  }

  async create(createUserDto: CreateUserDto) : Promise<User>
  { 
    const emailInUse = await this.userModel.findOne({
        email: createUserDto.email
    })
    if(emailInUse) {
      throw new BadRequestException("Email Already iIn Use");
    }

    const userCreate = new this.userModel();
    if (createUserDto.role === 'Admin') {
      const existingAdmin = await this.userModel.findOne({ role: 'Admin' });
      if (existingAdmin) {
        throw new ConflictException('Admin already exists');
      }
    }
    // Fetch the user with the highest userid, sorted in descending order
    const maxuser = await this.userModel.findOne({}).sort({userid: -1}).exec();
    // console.log("Maxuser = ", maxuser);
    let nextuserid; 
    if(maxuser && maxuser.userid){
      nextuserid = maxuser.userid + 1;
    } else {
      nextuserid = 1;
    }
    console.log("Next User ID", nextuserid);

    userCreate.userid = nextuserid;
    userCreate.name = createUserDto.name;
    userCreate.username = createUserDto.username;
    userCreate.email = createUserDto.email;
    userCreate.phone_number = createUserDto.phone_number;
    userCreate.password = await this.hashPassword(createUserDto.password);
    userCreate.role = createUserDto.role;
    userCreate.registerDate = new Date().toLocaleDateString();
    userCreate.registerTime = new Date().toLocaleTimeString();
    return userCreate.save();
  }

  findAll() : Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  findByName(name: string) {
    return this.userModel.findOne({name}).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = {
      name: updateUserDto.name,
      username: updateUserDto.username, 
      email: updateUserDto.email,
      phone_number: updateUserDto.phone_number
    }; 
    return this.userModel.findOneAndUpdate({ _id: id }, updatedUser, {new: true}).exec();
  }

  remove(id: string) {
    return this.userModel.deleteOne({_id: id}).exec();
  }

  async getUserByEmail(email: string) : Promise<User | undefined> {
      // Fetch user by username from the DB
    return this.userModel.findOne({email}).exec();
  }

}
