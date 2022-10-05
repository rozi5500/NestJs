import { MigrationInterface, QueryRunner } from 'typeorm';

export class catDescriptionFieldRemoved1664983515424
  implements MigrationInterface
{
  name = 'catDescriptionFieldRemoved1664983515424';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cat" DROP COLUMN "description"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cat" ADD "description" character varying NOT NULL`,
    );
  }
}
