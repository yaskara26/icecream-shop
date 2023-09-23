import { Entity, Column } from "typeorm";

import Model from "./Model";

@Entity('customers')
class Customer extends Model {
  @Column()
  name!: string;

  @Column()
  cpf!: string;

  @Column()
  email!: string;

  @Column()
  telephone!: string;

  @Column()
  birthday!: Date;
}

export default Customer;
