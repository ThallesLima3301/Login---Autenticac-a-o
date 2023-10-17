// Importando as interfaces necessárias do TypeORM para migrações.
import { MigrationInterface, QueryRunner } from "typeorm";

// Definindo a classe da migração.
export class default1658149110474 implements MigrationInterface {
    // Definindo o nome da migração.
    name = 'default1658149110474'

    // Método para atualizar o esquema do banco de dados.
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Executando uma query para criar a tabela 'users' com suas colunas.
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    // Método para reverter as alterações do esquema do banco de dados.
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Executando uma query para remover a tabela 'users'.
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
