// import {
//     Injectable,
//     CanActivate,
//     ExecutionContext,
//     UnauthorizedException,
//     ForbiddenException,
//   } from '@nestjs/common';
//   import { Reflector } from '@nestjs/core';
// import { AuthService } from 'src/auth/auth.service';
  
//   @Injectable()
//   export class AuthorizationGuard implements CanActivate {
//     constructor(private reflector: Reflector, private authService: AuthService) {}
//     async canActivate(context: ExecutionContext): Promise<boolean> {
  
//       const request = context.switchToHttp().getRequest();
  
//       if (!request.userId) {
//         throw new UnauthorizedException('User Id not found');
//       }
  
//       const routePermissions: Permission[] = this.reflector.getAllAndOverride(
//         "permissions",
//         [context.getHandler(), context.getClass()],
//       );
//       console.log(` the route permissions are ${routePermissions}`);
  
//       if (!routePermissions) {
//           return true;
//       }
  
//       try {
//         const userPermissions = await this.authService.getUserPermissions(
//           request.userId,
//         );
  
//         for (const routePermission of routePermissions) {
//           const userPermission = userPermissions.find(
//             (perm) => perm.resource === routePermission.resource,
//           );
  
//           if (!userPermission) throw new ForbiddenException();
  
//           const allActionsAvailable = routePermission.actions.every(
//             (requiredAction) => userPermission.actions.includes(requiredAction),
//           );
//           if (!allActionsAvailable) throw new ForbiddenException();
//         }
//       } catch (e) {
//         throw new ForbiddenException();
//       }
//       return true;
//     }
//   }