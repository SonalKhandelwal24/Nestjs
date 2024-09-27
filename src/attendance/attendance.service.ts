import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance, AttendanceDocument } from './schema/attendance';
import { Model } from 'mongoose';
import { promises } from 'dns';

@Injectable()
export class AttendanceService {

  constructor(@InjectModel(Attendance.name) private attendanceModel : Model<AttendanceDocument>) {}

  async create(createAttendanceDto: CreateAttendanceDto) : Promise<Attendance> {
    const attendanceData = new this.attendanceModel();

    const maxuser = await this.attendanceModel.findOne({}).sort({attendanceid: -1}).exec();
    console.log("Maxuser = ", maxuser);

    let nextuserid; 
    if(maxuser && maxuser.attendanceid){
      nextuserid = maxuser.attendanceid + 1;
    } else {
      nextuserid = 1;
    }
    console.log("Next User ID", nextuserid);

    attendanceData.attendanceid = nextuserid;
    attendanceData.name = createAttendanceDto.name;
    attendanceData.username = createAttendanceDto.username;
    attendanceData.email = createAttendanceDto.email;
    attendanceData.phone_number = createAttendanceDto.phone_number;
    attendanceData.date = new Date().toLocaleDateString();
    attendanceData.signIn = new Date().toLocaleTimeString();
    return attendanceData.save();
  }

  findAll() : Promise<Attendance[]>{
    return this.attendanceModel.find().exec();
  }

  findOne(id: string) {
    return this.attendanceModel.findById(id).exec();
  }

  async  update(id: string, updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceModel.findOneAndUpdate({_id : id},
      {name: updateAttendanceDto.name, username: updateAttendanceDto.username, email: updateAttendanceDto.email, phone_number: updateAttendanceDto.phone_number},
      {new: true}).exec();
  }

  remove(id: string) {
    return this.attendanceModel.deleteOne({_id : id}).exec();
  }
}
