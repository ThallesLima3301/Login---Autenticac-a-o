// Importando as dependências necessárias do Express, erros personalizados, repositório de usuário, bcrypt e jsonwebtoken.
import { Request, Response } from 'express'
import { BadRequestError } from '../helpers/api-erros'
import { userRepository } from '../repositories/userRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Classe UserController contendo métodos para lidar com as requisições relacionadas ao usuário.
export class UserController {
	// Método para criar um novo usuário.
	async create(req: Request, res: Response) {
		// Extração dos campos do corpo da requisição.
		const { name, email, password } = req.body

		// Verificação se o usuário já existe com o mesmo e-mail.
		const userExists = await userRepository.findOneBy({ email })

		// Lançando um erro se o usuário já existe.
		if (userExists) {
			throw new BadRequestError('E-mail já existe')
		}

		// Hashing da senha antes de salvar no banco de dados.
		const hashPassword = await bcrypt.hash(password, 10)

		// Criação de um novo usuário com a senha criptografada.
		const newUser = userRepository.create({
			name,
			email,
			password: hashPassword,
		})

		// Salvando o novo usuário no banco de dados.
		await userRepository.save(newUser)

		// Remoção do campo de senha antes de retornar os dados do usuário recém-criado.
		const { password: _, ...user } = newUser

		// Retornando os dados do usuário com status de criação bem-sucedida.
		return res.status(201).json(user)
	}

	// Método para lidar com o processo de login do usuário.
	async login(req: Request, res: Response) {
		// Extração dos campos de e-mail e senha do corpo da requisição.
		const { email, password } = req.body

		// Procura pelo usuário no banco de dados com base no e-mail fornecido.
		const user = await userRepository.findOneBy({ email })

		// Lançamento de um erro se o usuário não for encontrado.
		if (!user) {
			throw new BadRequestError('E-mail ou senha inválidos')
		}

		// Verificação se a senha fornecida corresponde à senha armazenada no banco de dados.
		const verifyPass = await bcrypt.compare(password, user.password)

		// Lançamento de um erro se as senhas não corresponderem.
		if (!verifyPass) {
			throw new BadRequestError('E-mail ou senha inválidos')
		}

		// Criação de um token JWT com um ID de usuário e uma chave secreta.
		const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
			expiresIn: '8h',
		})

		// Remoção do campo de senha antes de retornar os dados do usuário logado e o token.
		const { password: _, ...userLogin } = user

		// Retorno dos dados do usuário e o token JWT.
		return res.json({
			user: userLogin,
			token: token,
		})
	}

	// Método para obter o perfil do usuário.
	async getProfile(req: Request, res: Response) {
		// Retornando os dados do usuário contidos no objeto de solicitação.
		return res.json(req.user)
	}
}
