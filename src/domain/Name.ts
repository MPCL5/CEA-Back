import { Column } from 'typeorm';

export class Name {
  @Column({ type: 'varchar', length: 191 })
  first: string;

  @Column({ type: 'varchar', length: 191 })
  last: string;
}
