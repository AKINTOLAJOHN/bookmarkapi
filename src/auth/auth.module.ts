import { Injectable, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guard/index';
import { config } from 'process';
import { Authcontrolers } from './auth.controller';
import { Authservice } from './auth.service';
import { jwtStrategy } from './strategy';



@Module({

    imports : [JwtModule.register({
        global: true,
        
    })],

    controllers : [Authcontrolers],

    providers : [Authservice, AuthGuard],

    exports : [AuthGuard]
    
})

export class AuthModule {}