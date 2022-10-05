import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigration1664983309678 implements MigrationInterface {
  name = 'initialMigration1664983309678';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "owner" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e86b6b9f94aece7d12d465dc0c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cat" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "description" character varying NOT NULL, "recommendations" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_7704d5c2c0250e4256935ae31b4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "payload" json NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b535fbe8ec6d832dde22065ebd" ON "event" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6e1de41532ad6af403d3ceb4f2" ON "event" ("name", "type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "cat_owners_owner" ("catId" integer NOT NULL, "ownerId" integer NOT NULL, CONSTRAINT "PK_6ef9b48b5d732c66f93ad818619" PRIMARY KEY ("catId", "ownerId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d95c0ebd81e7fe0817306a766d" ON "cat_owners_owner" ("catId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e12db70acdd51d7404c87a0022" ON "cat_owners_owner" ("ownerId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "cat_owners_owner" ADD CONSTRAINT "FK_d95c0ebd81e7fe0817306a766d4" FOREIGN KEY ("catId") REFERENCES "cat"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "cat_owners_owner" ADD CONSTRAINT "FK_e12db70acdd51d7404c87a00220" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cat_owners_owner" DROP CONSTRAINT "FK_e12db70acdd51d7404c87a00220"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cat_owners_owner" DROP CONSTRAINT "FK_d95c0ebd81e7fe0817306a766d4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12db70acdd51d7404c87a0022"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d95c0ebd81e7fe0817306a766d"`,
    );
    await queryRunner.query(`DROP TABLE "cat_owners_owner"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6e1de41532ad6af403d3ceb4f2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b535fbe8ec6d832dde22065ebd"`,
    );
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP TABLE "cat"`);
    await queryRunner.query(`DROP TABLE "owner"`);
  }
}
