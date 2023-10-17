// Definição da classe de erro base para a API.
export class ApiError extends Error {
	// Propriedade para armazenar o código de status HTTP.
	public readonly statusCode: number

	// Construtor da classe com mensagem e código de status.
	constructor(message: string, statusCode: number) {
		super(message)
		this.statusCode = statusCode
	}
}

// Classe para lidar com erros de solicitação inválida (código de status 400).
export class BadRequestError extends ApiError {
	// Construtor que chama a classe base com o código de status 400.
	constructor(message: string) {
		super(message, 400)
	}
}

// Classe para lidar com erros de recurso não encontrado (código de status 404).
export class NotFoundError extends ApiError {
	// Construtor que chama a classe base com o código de status 404.
	constructor(message: string) {
		super(message, 404)
	}
}

// Classe para lidar com erros de solicitação não autorizada (código de status 401).
export class UnauthorizedError extends ApiError {
	// Construtor que chama a classe base com o código de status 401.
	constructor(message: string) {
		super(message, 401)
	}
}
