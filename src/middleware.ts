// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';
// import { NextResponse } from 'next/server';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//     use(req: Request, res: Response, next: NextFunction) {

//         const tokenCookie = req.cookies['auth_token'];
//         if (!tokenCookie) {
//             // Redirect to login if token is not present
//             return res.redirect('/login');
//         }

//         try {
//             const { role } = this.decodeJwt(tokenCookie);

//             if (req.path.startsWith('/adminDashboard') && role !== 'admin') {
//                 return res.redirect('/not-authorized');
//             }

//         } catch (error) {
//             return res.status(401).send('/Unauthorized');
//         }
//         next();
//     }

//     decodeJwt(token: string) {
//         try {
//             const base64Url = token.split('.')[1];
//             const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//             const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
//                 return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//             }).join(''));
//             return JSON.parse(jsonPayload);
//         } catch (e) {
//             return null;
//         }
//     }
// }
