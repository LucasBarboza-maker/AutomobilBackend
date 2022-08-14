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

export const stripeConfig = {
  PUBLIC_KEY: `${process.env.STRIPE_PUBLIC_KEY}`,
  PRIVATE_KEY: `${process.env.STRIPE_SECRET_KEY}`,
  WEBHOOK_LOCAL: `${process.env.WEBHOOK_LOCAL_KEY}`
}

export const tokenInfo = {
  JWT_SECRET: `${process.env.JWT_SECRET}`,
  JWT_EXPIRES_IN: `${process.env.JWT_EXPIRES_IN}`,
  JWT_COOKIE_EXPIRES_IN: Number(process.env.JWT_COOKIE_EXPIRES_IN)
}