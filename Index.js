import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import router from './source/routes/TodoRoutes.js'
import { errorHandler } from './source/middleware/errorHandler.js'
import authRoutes from './source/routes/authRoutes.js'
import morgan from 'morgan'
import session from 'express-session'

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(
    session({
      secret: process.env.secret, // keep this in .env for production
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 1, // 1 hour
      },
    })
  );  
app.use(errorHandler)
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);    // ✅ Auth route
app.use('/api/todos', router)
const port = process.env.PORT

app.listen(port, () => {
    console.log(port)
})