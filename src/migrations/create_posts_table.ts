import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostsTable1622299665807 implements MigrationInterface {
  name = 'createPostsTable1622299665807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE posts
                                 (
                                     post_id   INT AUTO_INCREMENT,
                                     created_at TIMESTAMP NOT NULL DEFAULT now(),
                                     updated_at TIMESTAMP NOT NULL DEFAULT now(),
                                     title  VARCHAR(100),
                                     description  TEXT,
                                     views      INT,
                                     deleted      INT,
                                     CONSTRAINT PK_postid PRIMARY KEY (post_id)
                                 )`);
  }
//   id         uuid              NOT NULL DEFAULT uuid_generate_v4(),
// 
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE posts');
    // await queryRunner.query('DROP TYPE "users_role_enum"');
  }
}
