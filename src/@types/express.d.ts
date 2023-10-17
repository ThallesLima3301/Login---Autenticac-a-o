// Importando o modelo de entidade 'User' de um arquivo específico.
import { User } from '../entities/User'

// Declarando um módulo global.
declare global {
	// Adicionando um namespace ao Express para estender a interface 'Request'.
	namespace Express {
		// Estendendo a interface 'Request' para incluir uma propriedade 'user' que é um subconjunto do tipo 'User'.
		export interface Request {
			user: Partial<User>
		}
	}
}
