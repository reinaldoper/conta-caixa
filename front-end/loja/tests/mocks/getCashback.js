import { rest } from 'msw'
import { setupServer } from 'msw/node'


export const handlers = [
  rest.put('http://localhost:3000/users/transaction', (req, res, ctx) => {
    const { transactionId } = req.body;
    const result = getResult(transactionId);
    if (!result) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'TransactionId is not exist.' })
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


export const serverGetCashback = setupServer(...handlers);

function getResult(transactionId) {
  const result = transactionId;
  const usersData = {
    'bc76a9f1-107b-412d-a9e8-991ac6f8ea8a': {
      date: '06/08/2023 21: 25:03',
      cashback: 0.05,
      value: 123009,
      transactionId: 'bc76a9f1-107b-412d-a9e8-991ac6f8ea8a',
      accountId: '018550210-56'
},
  };

return usersData[result] || null;
}