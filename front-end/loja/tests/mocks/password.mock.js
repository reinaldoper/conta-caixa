import { rest } from 'msw'
import { setupServer } from 'msw/node'




export const handlers = [
	rest.post('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
		return res(
			ctx.status(404),
			ctx.json([
				{
					body: 'Invalid cpf',
				},
			])
		);
	}),
];


export const serverPassword = setupServer(...handlers);