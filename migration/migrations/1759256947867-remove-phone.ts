import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePhone1759256947867 implements MigrationInterface {
    name = 'RemovePhone1759256947867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

}
