import { rest } from 'msw'
import { setupServer } from 'msw/node'


export const handlers = [
  rest.post('http://localhost:3000/users/transaction', (req, res, ctx) => {
    const { accountId } = req.body;
    const result = getResult(accountId);
    if (!result) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'AccountId is not exist.' })
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


export const serverCreateTransaction = setupServer(...handlers);

function getResult(accountId) {
  const result = accountId;
  const usersData = {
    '018.550.210-56': {
      date: '06/08/2023 21: 25:03',
      cashback: 0.05,
      value: 123009,
      transactionId: 'eedc46b1-7ef7-4552-a4de-a6f56ec8d2a0',
      accountId: '018.550.210-56'
},
  };

return usersData[result] || null;
}