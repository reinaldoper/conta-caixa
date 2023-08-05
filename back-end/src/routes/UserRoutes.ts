import UserController from "../controllers/User";
import { Router } from "express";
import validateToken from "../middleware/validateToken";
import validateUpdateUser from "../middleware/validateUpdateUser";
import validateUser from "../middleware/validateUser";
import validateGetByUser from "../middleware/validateGetByUser";

const routerUser = Router();
const userController = new UserController();

routerUser.post('/users', validateUpdateUser, userController.UserCreated);
routerUser.patch('/users/transaction', validateToken, userController.getTransactionByCpf);
routerUser.patch('/users', validateGetByUser, userController.getTokenByEmail);
routerUser.delete('/users', validateToken, userController.deleteUserByEmail);
routerUser.put('/users', validateToken, validateUser, userController.updateUser);
routerUser.patch('/users/get', validateToken, userController.getUser);
routerUser.put('/users/recover', validateToken, userController.recoverAccount)

export default routerUser;