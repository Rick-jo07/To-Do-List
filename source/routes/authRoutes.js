import express from "express";
import { Register, login, logout } from "../controller/authController.js";

const router = express.Router();

router.post('/Register', Register);
router.post('/Login', login);
router.post('/Logout', logout);

export default router;