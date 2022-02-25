import { Column } from 'typeorm';

export class Name {
  constructor(firstName = '', lastName = '') {
    this.last = lastName;
    this.first = firstName;
  }

  @Column({ type: 'varchar', length: 191 })
  first: string;

  @Column({ type: 'varchar', length: 191 })
  last: string;
}
