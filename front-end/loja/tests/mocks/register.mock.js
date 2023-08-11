export const credentials = {
  validEmail: 'caioguilherme@gmail.com',
  validPassword: 'gp17@12345',
  validName: 'Caio Guilherme de Oliveira',
  invalidEmail: 'caioguilhermegmail.com',
  invalidPassword: '12',
  invalidName: 'Caio',
  wrongEmail: 'gp17cg@gmail.com',
  wrongPassword: 'g12345',
  wrongName: 'Caio de Oliveira',
  cpf: '006.956.249-03',
};

export const apiResponse = {
  valid: {
    customer: {
      token: 'fakeToken',
      role: 'customer',
      name: 'José João da Silva Santos',
    },
  },
  invalid: {
    message: 'Incorrect email or password',
  },
};
