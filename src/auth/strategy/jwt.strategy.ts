import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
import { Authservice } from "../auth.service";
import { AuthinDto } from "../dto";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    
    constructor( config : ConfigService,
        private prisma : PrismaService,
        readonly authService : Authservice){
        
        super(
            
            {
                
            JwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),

            secretOrKey : '77380hcolhbdlio8w',
            
        }
        
        )

    }

    async validate(payload: AuthinDto){
        const user = await this.authService.login(payload);
        if (!user) {
          throw new UnauthorizedException();
        }

        return user
      }

}
