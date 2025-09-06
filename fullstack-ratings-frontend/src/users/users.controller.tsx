import { Controller, Get, Body, Param, Put, UseGuards, Req, Query, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('System Administrator')
  async findAll(@Query() query: any) {
    return this.usersService.findAll(query);
  }

  @Post()
  @Roles('System Administrator')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id/password')
  @Roles('System Administrator', 'Normal User', 'Store Owner')
  async updatePassword(@Param('id') id: string, @Body('password') password: string, @Req() req) {
    const userId = parseInt(id, 10);
    if (req.user.role !== 'System Administrator' && req.user.userId !== userId) {
      return { message: 'Unauthorized' };
    }
    return this.usersService.updatePassword(userId, password);
  }
}