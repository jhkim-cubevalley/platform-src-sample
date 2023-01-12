import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Contract } from './contract.entity';
import { Tos } from '../../../tos/domain/tos.entity';

@Entity('contract_tos')
export class ContractTos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Contract, (contract) => contract.tos)
  contract: Contract;

  @ManyToOne(() => Tos, (tos) => tos.contractTos)
  tos: Tos;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
