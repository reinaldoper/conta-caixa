import { PrismaClient } from '@prisma/client';
import { createConnection } from 'mysql2/promise';

const prisma = new PrismaClient();

async function dropDatabase() {
  try {
    const connection = await createConnection({
      host: 'localhost', 
      user: 'root',
      password: '123456',
    });
    const result = await connection.query('CREATE DATABASE IF NOT EXISTS caixa')
    if (result){
      await connection.query('DROP DATABASE IF EXISTS caixa;');
      console.log('Banco de dados excluído com sucesso!');
    } else {
      console.log('Banco de dados não existe!');
    }

    await connection.end();
  } catch (error) {
    console.error('Erro ao excluir o banco de dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

dropDatabase();
