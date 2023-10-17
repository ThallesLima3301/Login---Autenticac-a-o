// Importando funções e classes necessárias do TypeORM.
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

// Definindo uma entidade 'users'.
@Entity('users')
export class User {
    // Definindo uma coluna de chave primária que é gerada automaticamente.
    @PrimaryGeneratedColumn()
    id: number

    // Definindo uma coluna para o nome do usuário como texto.
    @Column({ type: 'text' })
    name: string

    // Definindo uma coluna para o e-mail do usuário como texto único.
    @Column({ type: 'text', unique: true })
    email: string

    // Definindo uma coluna para a senha do usuário como texto.
    @Column({ type: 'text' })
    password: string
}
