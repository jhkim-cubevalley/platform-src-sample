import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetProductQuery } from '../../queries/product/get-product.query';
import { Product } from '../../domain/product/product.entity';

@Injectable()
@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  async execute({ id }: GetProductQuery): Promise<Product | undefined> {
    const result = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: {
          categoryOne: true,
          categoryTwo: true,
          categoryThree: true
        },
        region: {
          regionOne: true,
          regionTwo: true,
          regionThree: true
        },
        promotionProducts: {
          promotion: true
        },
        cubeez: true,
        admin: true,
        manageGroup: {
          admin: true
        },
        image: true,
        approves: true,
        badges: true
      },
      select: {
        badges: {
          name: true,
          type: true
        },
        cubeez: {
          uid: true,
          email: true,
          name: true,
          profileUrl: true,
          nickname: true
        },
        admin: {
          uid: true,
          email: true,
          name: true
        }
      }
    });
    if (!result) return undefined;
    return result;
  }
}
