import { Controller, Post, Body, UseGuards, Get, Query, Param } from '@nestjs/common';
import { StoresService } from './stores.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateStoreDto } from './dto/create-store.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('stores')
@UseGuards(JwtAuthGuard)
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('System Administrator')
  async create(@Body() createStoreDto: CreateStoreDto, @GetUser() user: User) {
    return this.storesService.create(createStoreDto, user);
  }

  @Get()
  async findAll(@Query() query: any) {
    return this.storesService.findAll(query);
  }

  @Get('owner/:id')
  @UseGuards(RolesGuard)
  @Roles('Store Owner', 'System Administrator')
  async findOneByOwnerId(@Param('id') id: number, @GetUser() user: User) {
    return this.storesService.findOneByOwnerId(id);
  }
}