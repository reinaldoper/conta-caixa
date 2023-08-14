import { rest } from 'msw'
import { setupServer } from 'msw/node'


export const handlers = [
  rest.patch('http://localhost:3000/users/transaction', (req, res, ctx) => {
    const { cpf } = req.body;
    const result = getResult(cpf);
    if (!result) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Cpf is not null.' })
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


export const serverGetTransaction = setupServer(...handlers);

function getResult(cpf) {
  const result = cpf.cpf;
  const usersData = {
    '018.550.210-56': {
      date: '06/08/2023 21: 25:03',
      cashback: 0.05,
      value: 123009,
      transactionId: 'eedc46b1-7ef7-4552-a4de-a6f56ec8d2a0',
      accountId: '006956249-03'
},
  };

return usersData[result] || null;
}