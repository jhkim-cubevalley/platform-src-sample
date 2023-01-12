import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from '../product/product.entity';
import { ContractTos } from './contract-tos.entity';

const DEFAULT_HEADER =
  '(주)큐브밸리는 상품판매 큐비즈와 여행자 간 체결한 아래의 여행계약에 대해 다음과 같이 성실히 이행할 것을 약속하며, 계약서와 여행약관, 여행 일정표를 첨부합니다.';

// busins는 영업 보증보험의 뜻으로 사용합니다.

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { length: 1000, nullable: false, default: DEFAULT_HEADER })
  header: string;

  @Column('boolean', { nullable: false })
  isBusins: boolean;

  @Column('int', { nullable: false })
  businsPrice: number;

  @Column('date', { nullable: false })
  businsDateFrom: Date;

  @Column('date', { nullable: false })
  businsDateTo: Date;

  @Column('varchar', { nullable: false })
  require: string;

  @Column('varchar', { nullable: false })
  select: string;

  @Column('varchar', { nullable: false })
  tripLeader: string;

  @Column('varchar', { nullable: false })
  guide: string;

  @Column('varchar', { nullable: false })
  traffic: string;

  @Column('boolean', { nullable: false })
  isCompany: boolean;

  @Column('boolean', { nullable: false })
  isFree: boolean;

  @Column('varchar', { nullable: false })
  info: string;

  @Column('varchar', { nullable: false })
  refund: string;

  @Column('char', { length: 4, nullable: false })
  status: 'temp' | 'post';

  @OneToMany(() => Product, (product) => product.contract, { nullable: true })
  products: Product[] | null;

  @OneToMany(() => ContractTos, (contractTos) => contractTos.contract)
  tos: ContractTos[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
