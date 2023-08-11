import { rest } from 'msw'
import { setupServer } from 'msw/node'


export const handlers = [
  rest.patch('http://localhost:3000/users/get', (req, res, ctx) => {
    const { email } = req.body;
    const result = getResult(email);
    if (!result) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Email is not exist.' })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        data: result,
      })
    );
  }),
];


export const serverNavbar = setupServer(...handlers);

function getResult(email) {
  const result = email.email;
  const usersData = {
    'pedro@email.com': {
      name: 'Pedro',
      status: true,
      email: 'pedro@email.com',
      cpf: '018.550.210-56',
    },
  };

  return usersData[result] || null;
}