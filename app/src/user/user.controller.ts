import {
  Body,
  Controller,
  Get, Logger,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { UserService } from './user/user.service';
import { ValidationPipe } from '../shared/validation.pipe';
import { UserDto } from './user.dto';
import { AuthGuard } from '../shared/auth.gaurd';
import { User } from './user.decorator';

// @Controller('user')  Nếu để kiểu này thì phải get :
// http://localhost:4000/user/api/users/ || Post: http://localhost:4000/user/login/

@Controller()  // Nếu để kiểu này thì phải get
// :http://localhost:4000/api/users/ || Post: http://localhost:4000/login/
export class UserController {

   constructor(private userService: UserService) {}
   @Get('api/users')
   @UseGuards(new AuthGuard())  // validation Header
   // showAllUser(@User('id') user) {  // va phai gan AuthGuard tra ve thong tin
     // user
   showAllUser() {
     // Logger.log({user}, "010110");
      return this.userService.showAll();
   }
   @Post('login')
   @UsePipes(new ValidationPipe())
  login(@Body() data: UserDto) {
     return this.userService.login(data);
   }
   @Post('register')
   @UsePipes(new ValidationPipe())
  register(@Body() data: UserDto) {
     return this.userService.register(data);
   }
}
