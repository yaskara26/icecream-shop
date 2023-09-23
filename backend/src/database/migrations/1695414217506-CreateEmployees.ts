import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmployees1695414217506 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table(
      {
        name: "employees",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "gen_random_uuid()"
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "cpf",
            type: "varchar",
            isUnique: true
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true
          },
          {
            name: "telephone",
            type: "varchar"
          },
          {
            name: "birthday",
            type: "timestamp"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "version",
            type: "int",
            default: 1
          }
        ]
      }
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("employees");
  }

}
