import { Column, Entity } from "typeorm";

import Model from "./Model";

@Entity("employees")
class Employee extends Model {
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

export default Employee;
