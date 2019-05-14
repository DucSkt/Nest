import {
    Controller,
    Get,
    Logger,
    Post,
    Param,
    Body,
    Delete,
    Put,
    UsePipes,
    UseGuards,
    Query,
  } from '@nestjs/common';
import { IdeaDTO } from './idea.dto'

import { IdeaService } from './idea/idea.service'
import { ValidationPipe } from '../shared/validation.pipe'
import { AuthGuard } from '../shared/auth.gaurd'
import { User } from '../user/user.decorator'

@Controller('api/idea')
export class IdeaController {

    constructor(private ideaService: IdeaService) {}

    private logData(options: any) {
      options.user && Logger.log(JSON.stringify(options.user));
      options.body && Logger.log(JSON.stringify(options.body));
      options.id && Logger.log(JSON.stringify(options.id));
    }

    @Get()
    showAllIdeas() {
        return this.ideaService.showAll();
    }

    @Post()
    @UseGuards(new AuthGuard())  // Validate token trong Header, gan user vao
    // idea
    @UsePipes(new ValidationPipe() )
    createIdea(@User('id') user, @Body() data: IdeaDTO ) {  //decator lay
      // info tu AuthGuard
        return this.ideaService.create(user, data);
    }

    @Get(':id')
    readIdea(@Param('id') id: string) {
      Logger.log(id, "IDID");
        return this.ideaService.read(id);
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    updateIdea(
      @Param('id') id: string,
      @User('id') user,
      @Body() data: Partial<IdeaDTO>) {

      return this.ideaService.update(id, user , data);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    destroyIdea(@Param('id') id: string, @User('id') user) {
        return this.ideaService.destroy(id, user);
    }
}
