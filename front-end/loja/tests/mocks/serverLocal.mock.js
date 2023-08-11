import { rest } from 'msw'
import { setupServer } from 'msw/node'

export const handlers = [
	rest.patch('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json([
				{
					body: 'wjhjghkjas.kjsgadkja.uuhakasfkahsfb.uuhakasfkahsfb.uuhakames',
				},
			])
		);
	}),
];


export const serverLocal = setupServer(...handlers);