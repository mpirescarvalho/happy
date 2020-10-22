import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addPendingFieldToOrphanages1603332538750
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orphanages',
      new TableColumn({
        name: 'pending',
        type: 'boolean',
        isNullable: false,
        default: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orphanages', 'pending');
  }
}
