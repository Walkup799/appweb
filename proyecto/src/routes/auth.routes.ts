import { Router } from "express";
import { getByUsername, getAllUsers, getTime, login, updateTime, createUser, updateUser, deleteUser } from "../controllers/auth.controller";

const router = Router();

router.post('/login-user', login);
router.get('/getTime/:userId', getTime);
router.put('/updateTime', updateTime);

router.get('/users', getAllUsers);
router.get('/users/:username', getByUsername);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.patch('/users/:id', deleteUser);

export default router;
