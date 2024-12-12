import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1734035492822 implements MigrationInterface {
    name = 'InitialMigration1734035492822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pix" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying NOT NULL, "type" "public"."pix_type_enum" NOT NULL, "recipient" character varying NOT NULL DEFAULT 'fernando lacerda', "value" double precision NOT NULL, "userId" uuid, CONSTRAINT "PK_da846dad51d704c2f2814148ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pix" ADD CONSTRAINT "FK_2536476872148f45c4b8d97e655" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pix" DROP CONSTRAINT "FK_2536476872148f45c4b8d97e655"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "pix"`);
    }

}
