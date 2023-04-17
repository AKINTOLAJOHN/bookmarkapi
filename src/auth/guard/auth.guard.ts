import {
    CanActivate,
    ExecutionContext,
    Global,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Authservice } from '../auth.service';
import { User } from '@prisma/client';
import { request } from 'express';


@Global()
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
      private authService : Authservice,
      private jwtService: JwtService,
       private config : ConfigService,
       ) {}
  
    async canActivate(context: ExecutionContext): Promise<any> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        
        const payload = await this.jwtService.verify(
          token,
          {
            secret:  this.config.get('jwt_secret')

          }
        );
        
         return this.validateUser(payload)

      } catch {

        throw new UnauthorizedException();
        
      }
      
    }
    
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const authorization = request.headers['authorization'];
      if (!authorization || Array.isArray(authorization)) {
        throw new Error('Invalid Authorization Header');
      }
      const [type, token] = authorization.split(' ');
      return type === 'Bearer' ? token : undefined;
    }


   async validateUser(payload : { sub : number, email : string}){

    try{
      
      const index = this.authService.validateUser(payload.sub, payload.email)

      let user = await index

      request['user'] = user;
  
      delete user.hash

    }catch{

      throw new UnauthorizedException();

    }


    
    return true
  }


  }