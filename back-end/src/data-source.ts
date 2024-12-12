import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Pix } from "./entities/pix.entity";
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host:  process.env.POSTGRES_DB,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User, Pix],
  migrations: ["./src/migrations/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("AppDataSource inicializado com sucesso");
  })
  .catch((err) => {
    console.error("Erro durante inicialização do AppDataSource", err);
  });
