import { Body, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, AuthinDto } from "./dto";
import * as bcrypt from 'bcrypt';
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { config } from "process";
import { ConfigService } from "@nestjs/config";

@Injectable()

export class Authservice {

    constructor(private prisma: PrismaService,
        private jwt : JwtService,
        private config : ConfigService) {}
    
    async signup(dto : AuthDto){

        const hash = await argon.hash(dto.password);

        const user = this.prisma.user.create({

            data :{

                email : dto.email,

                hash,

                firstName : dto.firstName,

                lastName : dto.lastName

            }

        })


        return user

    }

    async login(dto : AuthinDto){

        const user = await this.prisma.user.findUnique({

            where : {

                email : dto.email,

            },

        })

        if(!user)
            throw new ForbiddenException(

                'Credentials incorrect',
            )

        const pwMatches = await argon.verify(

            user.hash, dto.password,

        )

        if (!pwMatches)
            throw new ForbiddenException(

                'Credentials incorrect',

            )

        return this.signtoken(user.id, user.email);

    }

    async signtoken(userId : Number, email: string){

        const payload = {

            sub : userId,

            email

        }

        const secret = this.config.get('jwt_secret')

        const token = await this.jwt.sign(payload, {

            expiresIn : '60m',

            secret : secret

        })

        return {

            access_token : token

        }
        
    }

    async validateUser(sub : number, email : string) {

        const user = await this.prisma.user.findUnique({

            where : {

                id : sub,

            },

        })

        return user

    }


}
