import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDto, owner: User): Promise<Store> {
    const store = this.storesRepository.create({ ...createStoreDto, owner });
    return this.storesRepository.save(store);
  }

  async findAll(query: any): Promise<any[]> {
    const stores = await this.storesRepository
      .createQueryBuilder('store')
      .leftJoinAndSelect('store.ratings', 'rating')
      .getMany();
    
    return stores.map(store => {
      const averageRating = store.ratings.length > 0
        ? store.ratings.reduce((acc, curr) => acc + curr.rating, 0) / store.ratings.length
        : null;
      return { ...store, averageRating, ratings: undefined };
    });
  }

  async findOneByOwnerId(ownerId: number): Promise<any> {
    const store = await this.storesRepository
      .createQueryBuilder('store')
      .leftJoinAndSelect('store.owner', 'owner')
      .leftJoinAndSelect('store.ratings', 'rating')
      .leftJoinAndSelect('rating.user', 'user')
      .where('owner.id = :ownerId', { ownerId })
      .getOne();

    if (!store) {
      return null;
    }

    const averageRating = store.ratings.length > 0
      ? store.ratings.reduce((acc, curr) => acc + curr.rating, 0) / store.ratings.length
      : null;

    return { ...store, averageRating };
  }
}