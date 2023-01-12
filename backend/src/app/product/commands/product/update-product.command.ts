import { ICommand } from '@nestjs/cqrs';
import { Product, ProductStatus } from '../../domain/product/product.entity';

interface UpdateProductCommandInput {
  readonly name: string;
  readonly nameEn: string;
  readonly fuelSurcharge: number;
  readonly priceAdult: number;
  readonly priceTeen: number;
  readonly priceKid: number;
  readonly priceText: string;
  readonly minPeople: number;
  readonly maxPeople: number;
  readonly departure: string;
  readonly dateFrom: Date;
  readonly dateTo: Date;
  readonly departurePeriod: string;
  readonly endDay: number;
  readonly description: string;
  readonly pros: string;
  readonly regions: Array<{
    readonly regionOne: string;
    readonly regionTwo: string;
    readonly regionThree: string;
  }>;
  readonly categories: Array<{
    readonly categoryOne: string;
    readonly categoryTwo?: string;
    readonly categoryThree?: string;
  }>;
  readonly tag: string;
  readonly isManagement: boolean;
  readonly moreMessage?: string;
  readonly flights: Array<{
    readonly flightType: 'arrival' | 'departure';
    readonly isLayover: boolean;
    readonly flightName: string;
    readonly company: string;
    readonly seatRank: string;
    readonly departureTime: string;
    readonly arrivalTime: string;
    readonly moveTime: string;
  }>;
  readonly content: string;
  readonly tripDate: number;
  readonly tripNight: number;
  readonly plans: Array<{
    readonly day: number;
    readonly description: string;
    readonly details: Array<{
      readonly type: string;
      readonly content?: string;
      readonly libraryId?: string;
    }>;
  }>;
  readonly notes: Array<{
    readonly type: 'in' | 'notin';
    readonly title: string;
    readonly description: string;
  }>;
  readonly moreNote: string;
  readonly caution: string;
  readonly refund: string;
  readonly status: ProductStatus;
  readonly requestMessage: string;
  readonly tos: string[];
  readonly images: Array<{
    readonly url: string;
    readonly isThumb: boolean;
  }>;
}

export class UpdateProductCommand implements ICommand {
  constructor(readonly product: Product, readonly data: Partial<UpdateProductCommandInput>) {}
}
