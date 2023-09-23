class CustomerDTO {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  telephone: string;
  birthday: Date;

  constructor() { }

  // getEmail(): string {
  //   return this.email;
  // }

  // setEmail(email: string): void {
  //   this.email = email;
  // }

  // getTelephone(): string {
  //   return this.telephone;
  // }

  // setTelephone(telephone: string): void {
  //   this.telephone = telephone;
  // }

  // getName(): string {
  //   return this.name;
  // }

  // setName(name: string): void {
  //   this.name = name;
  // }

  // getCpf(): string {
  //   return this.cpf;
  // }

  // setCpf(cpf: string): void {
  //   this.cpf = cpf;
  // }
}

export default CustomerDTO;