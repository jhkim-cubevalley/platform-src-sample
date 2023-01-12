import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export type ServerConfigKey = 'AFTER_PRICE_RATE' | 'BEFORE_PRICE_RATE';

@Entity('server_configs')
export class ServerConfig {
  @PrimaryColumn('varchar', { nullable: false, unique: true })
  key: ServerConfigKey;

  @Column('varchar', { nullable: false })
  value: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
