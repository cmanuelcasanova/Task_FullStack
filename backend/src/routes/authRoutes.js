import express from 'express';
import { login, register, logout, getprofile} from '../controllers/authController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get("/profile", authMiddleware, getprofile);


export default router;
