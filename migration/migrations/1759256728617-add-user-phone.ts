import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPhone1759256728617 implements MigrationInterface {
    name = 'AddUserPhone1759256728617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "towFASecret" text, "enable2FA" boolean NOT NULL DEFAULT false, "phone" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artists" ("id" SERIAL NOT NULL, "userId" integer, CONSTRAINT "REL_f7bd9114dc2849a90d39512911" UNIQUE ("userId"), CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "songs" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "releasedDate" date NOT NULL, "duration" TIME NOT NULL, "lyrics" text NOT NULL, CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "songes-artists" ("songsId" integer NOT NULL, "artistsId" integer NOT NULL, CONSTRAINT "PK_07806014249c525f6fb20cd396d" PRIMARY KEY ("songsId", "artistsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7583985fcae6a0f1f6b442be3e" ON "songes-artists" ("songsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5bd1d9f2df778ae4a7e9b622a3" ON "songes-artists" ("artistsId") `);
        await queryRunner.query(`ALTER TABLE "artists" ADD CONSTRAINT "FK_f7bd9114dc2849a90d39512911b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "songes-artists" ADD CONSTRAINT "FK_7583985fcae6a0f1f6b442be3e8" FOREIGN KEY ("songsId") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "songes-artists" ADD CONSTRAINT "FK_5bd1d9f2df778ae4a7e9b622a37" FOREIGN KEY ("artistsId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songes-artists" DROP CONSTRAINT "FK_5bd1d9f2df778ae4a7e9b622a37"`);
        await queryRunner.query(`ALTER TABLE "songes-artists" DROP CONSTRAINT "FK_7583985fcae6a0f1f6b442be3e8"`);
        await queryRunner.query(`ALTER TABLE "artists" DROP CONSTRAINT "FK_f7bd9114dc2849a90d39512911b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5bd1d9f2df778ae4a7e9b622a3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7583985fcae6a0f1f6b442be3e"`);
        await queryRunner.query(`DROP TABLE "songes-artists"`);
        await queryRunner.query(`DROP TABLE "songs"`);
        await queryRunner.query(`DROP TABLE "artists"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
