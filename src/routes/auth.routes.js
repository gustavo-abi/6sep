import { Router } from "express"
import { login, register, logout, profile, verifyToken } from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'

const router = Router()

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/verify', verifyToken)
router.get('/profile', authRequired, profile)

import User from '../models/user.model.js';


router.get('/user', async (req, res) => {
    try {
      const userEmail = req.query.email;
  
      if (!userEmail) {
        return res.status(400).json({
          message: 'Debes proporcionar un correo electrónico'
        });
      }
  
      // Busca el usuario por su dirección de correo electrónico en la base de datos
      const userFound = await User.findOne({ email: userEmail });
  
      if (!userFound) {
        return res.status(404).json({
          message: 'Usuario no encontrado'
        });
      }
  
      // Devuelve los datos del usuario
      res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
        is_admin:userFound.is_admin
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // ... (otras rutas) ...
  
  
export default router