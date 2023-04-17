import { Controller, Post, Body, UseGuards, Get } from "@nestjs/common";
import { AuthGuard } from './guard/index';
import { Authservice } from "./auth.service";
import { AuthDto, AuthinDto } from "./dto";

@Controller('auth')

export class Authcontrolers {

    constructor(private authService : Authservice) {

    }
    
    @Post('signup')
    signup(@Body() dto : AuthDto) {

        return this.authService.signup(dto)
        
    }
    
    @Post('signin')
    signin(@Body() dtoin : AuthinDto) {

        return this.authService.login(dtoin)

    }

}