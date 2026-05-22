import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  NODE_ENV: string;
  PORT: string;
  DATABASE_URL: string;
  STRIPE_SECRET_KEY: string;
}

export const ENV: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV as string,
  PORT: process.env.PORT as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
};
