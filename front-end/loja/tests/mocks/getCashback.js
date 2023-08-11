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
    'eedc46b1-7ef7-4552-a4de-a6f56ec8d2a0': {
      date: '06/08/2023 21: 25:03',
      cashback: 0.05,
      value: 123009,
      transactionId: 'eedc46b1-7ef7-4552-a4de-a6f56ec8d2a0',
      accountId: '006956249-03'
},
  };

return usersData[result] || null;
}