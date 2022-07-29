import { config } from 'dotenv';

/*
 * Aqui estamos dizendo para o dotenv
 * onde ele deve buscar as variáveis de ambiente
 * NODE_ENV será o stage da nossa aplicação [dev, qa, prod, local, etc...]
 */
const envfile = `.env.${process.env.NODE_ENV}`;
const envdir = process.cwd();

config({ path: `${envdir}/${envfile}` });

export const server = {
  PORT: process.env.PORT,
  ENV: process.env.NODE_ENV,

}

export const dbConnection = {
  DATABASE: `${process.env.DATABASE}`,
  DATABASE_PASSWORD: `${process.env.DATABASE_PASSWORD}`
}