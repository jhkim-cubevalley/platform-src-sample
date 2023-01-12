import { ICommand } from '@nestjs/cqrs';
import { Product } from '../../product/domain/product/product.entity';

export class CreateEventTypeCommand implements ICommand {
  constructor(
    readonly data: {
      readonly product: Product;
      readonly startDate: Date[];
      readonly type: string;
      readonly description: string;
      readonly fuelSurcharge: number;
      readonly priceAdult: number;
      readonly priceTeen: number;
      readonly priceKid: number;
      readonly priceText?: string;
      readonly flights: Array<{
        readonly flightType: 'arrival' | 'departure';
        readonly isLayover: boolean;
        readonly flightName: string;
        readonly company: string;
        readonly seatRank: string;
        readonly canChange: boolean;
        readonly departureTime: string;
        readonly arrivalTime: string;
        readonly moveTime: string;
      }>;
      readonly plans: Array<{
        readonly day: number;
        readonly description: string;
        readonly details: Array<{
          readonly type: string;
          readonly content?: string;
          readonly libraryId?: string;
        }>;
      }>;
    }
  ) {}
}
