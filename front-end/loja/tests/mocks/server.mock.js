import { rest } from 'msw'
import { setupServer } from 'msw/node'




export const handlers = [
	rest.patch('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
		return res(
			ctx.status(404),
			ctx.json([
				{
					body: 'User not found',
				},
			])
		);
	}),
];


export const server = setupServer(...handlers);