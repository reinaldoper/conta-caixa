import app from '../app';
import supertest from 'supertest';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const request = supertest(app);
const prisma = new PrismaClient();

describe('Route /users', () => {
  afterEach(async () => {
    await prisma.conta.deleteMany();
  });
  afterEach(async () => {
    await prisma.transaction.deleteMany();
  });

  it('should return a user not found "Invalid cpf" ', async () => {
    
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '006.954.249-05',
      password: 'password'
    };

    const response = await request.post('/users').send(newUser);
    

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({"message":"Invalid cpf"});

    const createdUser = await prisma.conta.findUnique({
      where: { email: newUser.email },
    });
    expect(createdUser).not.toBeTruthy();
  });

  it('should return a user not found "Invalid cpf" ', async () => {
    
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '000000000',
      password: 'password'
    };

    const response = await request.post('/users').send(newUser);
    

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({"message":"Invalid cpf"});

    const createdUser = await prisma.conta.findUnique({
      where: { email: newUser.email },
    });
    expect(createdUser).not.toBeTruthy();
  });

  it('should return a user not found "Dados is not invalid." ', async () => {
    
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '',
      password: 'password'
    };

    const response = await request.post('/users').send(newUser);
    

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ "message": "Dados is not invalid." });

    const createdUser = await prisma.conta.findUnique({
      where: { email: newUser.email },
    });
    expect(createdUser).not.toBeTruthy();
  });

  it('should return a user valid', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    const response = await request.post('/users').send(newUser);
    

    expect(response.status).toBe(201);

    const createdUser = await prisma.conta.findUnique({
      where: { email: newUser.email },
    });
    expect(createdUser).toBeTruthy();
  });

  it('should return a "transactions" witch message equals "token not found" ', async () => {
    const newUser = {
      cpf: '955.591.670-53',
      
    };

    const response = await request.patch('/users/transaction').send(newUser);
    

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Token not found' });

  });

  it('should return a "Email already exist"', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });


    const response = await request.post('/users').send(newUser);
    
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ message: 'Email already exist' });

  });

  it('should return a "transactions" witch transactions valid', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    

    const response = await request.patch('/users/transaction').send({ cpf: '955.591.670-53'}).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    

    expect(response.status).toBe(200);
    

  });

  it('should return a message witch "Account not authorized."', async () => {
    const user = { id: 1, status: false };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    

    const response = await request.patch('/users/transaction').send({ cpf: '955.591.670-53'}).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ message: 'Account not authorized.' });
    

  });

  it('should return a "transactions" witch message equal "message":"Account is not exist."', async () => {
    const userData = {
      id: 1,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    
    const newUser = {
      cpf: '955.591.670-53',
      
    };

    const response = await request.patch('/users/transaction').send(newUser).
    set('Authorization', token);
    

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({"message":"Account is not exist."});

  });

  it('should return 400 for invalid user data witch "Dados is not invalid."', async () => {
    const invalidUser = {
      email: 'jane@example.com',
    };

    const response = await request.post('/users').send(invalidUser);
    

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ message: 'Dados is not invalid.' });
  });

  it('should return a message witch "{ "message": "Updated user." }"', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    

    const response = await request.put('/users').send({ email: 'john@example.com', name: 'Mary Joe', password: 'password1'}).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    
    
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ "message": "Updated user." });
    

  });

  it('should return a message witch "Email is not exist."', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    

    const response = await request.put('/users').send({ email: 'maria.example@.com', name: 'Mary Joe', password: 'password1'}).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    
    
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ "message": "Email is not exist." });
    

  });

  it('should return a message witch "Dados is invalid."', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    

    const response = await request.put('/users').send({name: 'Mary Joe', password: 'password1'}).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    
    
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ "message": "Dados is invalid." });
    

  });

  it('should return a message witch "Dados is not string."', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    

    const response = await request.put('/users').send({ email: 1234, name: 'Mary Joe', password: 'password1'}).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    
    
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ "message": "Dados is not string." });
    

  });

  it('should return a message witch "Account has been deleted."', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    

    const response = await request.delete('/users').send({ email: 'john@example.com' }).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    
    
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ "message": "Account has been deleted." });
    

  });

  it('should return a message witch "Token not found" want delete', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });
    const response = await request.delete('/users').send({ email: 'john@example.com' }).
    set('authenticatedUser', JSON.stringify(user));
    
    
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ "message": 'Token not found' });
    

  });

  it('should return a message witch "Recover account with success." recover account.', async () => {
    const user = { id: 1, status: false };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    

    const response = await request.put('/users/recover').send({ email: 'john@example.com' }).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    
    
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ "data": 'Recover account with success' });
    

  });

  it('should return a message witch "Token not found." recover account.', async () => {
    const user = { id: 1, status: false };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });
    

    const response = await request.put('/users/recover').send({ email: 'john@example.com' }).
    set('authenticatedUser', JSON.stringify(user));
    
    
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({"message": 'Token not found'});
    

  });

  it('should return a message witch "Token not found" get user.', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });
    

    const response = await request.patch('/users/get').send({ email: 'john@example.com' }).
    set('authenticatedUser', JSON.stringify(user));
    
    
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: 'Token not found' });

  });

  it('should return a message witch "status 200" get user.', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    

    const response = await request.patch('/users/get').send({ email: 'john@example.com' }).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    
    
    
    expect(response.status).toBe(200);

  });

  it('should return a message witch "status 200" create transaction.', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    

    const response = await request.post('/transaction').send({ accountId: '955.591.670-53', value: 300 }).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    console.log(response);
    
    
    
    
    expect(response.status).toBe(200);

  });

  it('should return a message witch "Token not Found" create transaction.', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });
    

    const response = await request.post('/transaction').send({ accountId: '955.591.670-53', value: 300 }).
    set('authenticatedUser', JSON.stringify(user));
    console.log(response);
    
    
    
    
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({"message": 'Token not found'});

  });

  it('should return a message witch "Expired or invalid token" create transaction.', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });
    const token = "xxxxxxxxxxxxxx"
    

    const response = await request.post('/transaction').send({ accountId: '955.591.670-53', value: 300 }).
    set('Authorization', token).
    set('authenticatedUser', JSON.stringify(user));
    
    
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({"message": 'Expired or invalid token'});

  });
  it('should return a message witch "Account is not exist." create transaction.', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: 2,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    

    const response = await request.post('/transaction').send({ accountId: '955.591.670-53', value: 300 }).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ "message": "Account is not exist." });

  });

  it('should return a message witch "TransactionId is not exist." create cashback.', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });

    await request.post('/transaction').send({ accountId: '955.591.670-53', value: 300 }).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    const transactionId = 'khjhj879789';
    

    const response = await request.put('/transaction').send({ cashback: 0.05, transactionId: transactionId }).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ "message": "TransactionId is not exist." });

  });

 
  it('should return a message witch "Dados is not null." create cashback.', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id, 
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });

    await request.post('/transaction').send({ accountId: '955.591.670-53', value: 300 }).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    

    const response = await request.put('/transaction').send({ value: 300 }).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    
  
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ "message": "Dados is not null" });

  });

  it('should return a message witch "Expired or invalid token." create cashback.', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id, 
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });

    const response1 = await request.post('/transaction').send({ accountId: '955.591.670-53', value: 300 }).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    const token1 = 'kjkhj34234234';
    

    const response = await request.put('/transaction').send({ value: 300, transactionId: response1.body.data.transactionId }).
    set('Authorization', token1).set('authenticatedUser', JSON.stringify(user));
    
  
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({"message": 'Expired or invalid token'});

  });

  it('should return a message witch "Account not authorized." create transaction.', async () => {
    const user = { id: 1, status: false };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    

    const response = await request.post('/transaction').send({ accountId: '955.591.670-53', value: 300 }).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ "message": "Account not authorized." });

  });
  it('should return a message witch "Invalid accountId." create transaction.', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    

    const response = await request.post('/transaction').send({ accountId: '955.591.670-40', value: 300 }).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
   
    
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ message: 'Invalid accountId' });

  });

  it('should return a message witch "AccountId is not exist." create transaction.', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    

    const response = await request.post('/transaction').send({ accountId: '014.609.690-81', value: 300 }).
    set('Authorization', token).set('authenticatedUser', JSON.stringify(user));
    
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ "message": "AccountId is not exist." });

  });

  it('should return a "Invalid password" witch login.', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });


    const response = await request.patch('/users').send({ email: 'john@example.com', password: newUser.password }).set('authenticatedUser', JSON.stringify(user));
    
    
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({"message": 'Invalid password'});

  });

  it('should return a "Dados invalid" witch login.', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });


    const response = await request.patch('/users').send({ email: 'john@example.com' }).set('authenticatedUser', JSON.stringify(user));
    
    
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ "message": "Dados invalid." });

  });

  it('should return a "Dados is not string." witch login.', async () => {
    const user = { id: 1, status: true };
    const newUser = {
      id: user.id,
      status: user.status,
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '955.591.670-53',
      password: 'password'
    };

    await prisma.conta.create({
      data: newUser,
    });

    const userData = {
      id: user.id,
      email: 'john@example.com'
    };

    const token = jwt.sign(userData, 'secret', {
      expiresIn: '5d',
      algorithm: 'HS256',
    });


    const response = await request.patch('/users').send({ email: 'john@example.com', password: 123 }).set('authenticatedUser', JSON.stringify(user));
    
    
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ "message": "Dados is not string." });

  });
});
