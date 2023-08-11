import { rest } from 'msw'
import { setupServer } from 'msw/node'


export const handlers = [
  rest.delete('http://localhost:3000/users/', (req, res, ctx) => {
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
        "message": "Account has been deleted.",
      })
    );
  }),
];


export const serverDelete = setupServer(...handlers);

function getResult(email) {
  const result = email;
  const usersData = {
    'pedro@email.com': {
      "message": "Account has been deleted."
},
  };

return usersData[result] || null;
}