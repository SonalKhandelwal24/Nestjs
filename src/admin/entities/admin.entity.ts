export class Admin {

    adminname : string;
    password : string
    email : string
    age : number; 
    role : string[];
    permissions : string[];       //['manage_users', 'view_reports']
    lastLogin: Date; // Timestamp of the last login
    
}
