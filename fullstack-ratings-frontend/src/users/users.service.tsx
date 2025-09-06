import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { StoresService } from '../stores/stores.service';
import { RatingsService } from '../ratings/ratings.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private storesService: StoresService,
    private ratingsService: RatingsService,
  ) {}
  
  // ... (previous methods)

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user || null;
  }
  
  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findAll(query: any): Promise<any[]> {
    const { name, email, address, role, sort, order } = query;
    const qb = this.usersRepository.createQueryBuilder('user');

    if (name) qb.andWhere('user.name ILIKE :name', { name: `%${name}%` });
    if (email) qb.andWhere('user.email ILIKE :email', { email: `%${email}%` });
    if (address) qb.andWhere('user.address ILIKE :address', { address: `%${address}%` });
    if (role) qb.andWhere('user.role = :role', { role });
    if (sort && order) qb.orderBy(`user.${sort}`, order.toUpperCase());

    return qb.getMany();
  }
  
  async getDashboardStats() {
    const userCount = await this.usersRepository.count();
    const storeCount = await this.storesService.count();
    const ratingCount = await this.ratingsService.count();
    return { users: userCount, stores: storeCount, ratings: ratingCount };
  }
}