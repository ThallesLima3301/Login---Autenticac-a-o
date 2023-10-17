
import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/api-erros' 
import { userRepository } from '../repositories/userRepository'
import jwt from 'jsonwebtoken' 

// Definindo o tipo de payload para o JWT.
type JwtPayload = {
	id: number
}

// Definindo o middleware de autenticação.
export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Obtendo o cabeçalho de autorização da requisição.
	const { authorization } = req.headers

	// Verificando se o cabeçalho de autorização existe.
	if (!authorization) {
		// Lançando um erro de não autorização caso o cabeçalho não exista.
		throw new UnauthorizedError('Não autorizado')
	}

	// Extraindo o token do cabeçalho de autorização.
	const token = authorization.split(' ')[1]

	// Verificando e decodificando o token JWT.
	const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

	// Procurando o usuário no repositório com o ID extraído do token.
	const user = await userRepository.findOneBy({ id })

	// Verificando se o usuário foi encontrado.
	if (!user) {
		// Lançando um erro de não autorização se o usuário não for encontrado.
		throw new UnauthorizedError('Não autorizado')
	}

	// Desestruturando o usuário para remover a senha antes de anexá-lo ao objeto de requisição.
	const { password: _, ...loggedUser } = user

	// Anexando o usuário autenticado ao objeto de requisição.
	req.user = loggedUser

	// Passando o controle para a próxima função no middleware.
	next()
}
