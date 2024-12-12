import express from "express"

import { createUserController } from "./controllers/user.controller";
import { loginUserController } from "./controllers/user.controller";
import { createPixController } from "./controllers/pix.controller";
import { authUserMiddleware } from "./middlewares/authUser.middleware";

const routes = express.Router()

routes.post("/clients", createUserController)
routes.post("/login", loginUserController)
routes.post("/clients/pix", authUserMiddleware, createPixController )

export default routes