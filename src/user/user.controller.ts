import { Body, Controller, Get, UseGuards, Req, Patch} from '@nestjs/common';
import { getUser } from 'src/auth/decorator';
import { Request } from 'express';
import { AuthGuard } from '../auth/guard/index';
import { User } from '@prisma/client';
import { EditUserDto } from 'src/auth/dto/edit-user.dto';
import { UserService } from './user.service';



@Controller('users')
export class UserController {

    constructor (
        private userService : UserService
    ){}

    @UseGuards(AuthGuard)
    @Get('me')
    async getme(@getUser() user: User){
       
        console.log(user)


    }

    @UseGuards(AuthGuard)
    @Patch()
    async updateinfo(
        @getUser('id')  userId : number,
        @Body() editdto : EditUserDto){

            return this.userService.editUser(userId, editdto)
    }
}
