import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './config/db.js';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import fypsRoute from './routes/fyps.js';
import internshipsRoute from './routes/internships.js';
import scholarshipsRoute from './routes/scholarships.js';
import passwordRoute from './routes/password.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

await connectToDB();

app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json());

app.use('/auth', authRoute);
app.use('/users', usersRoute); 
app.use('/fyps', fypsRoute);
app.use('/internships', internshipsRoute);
app.use('/scholarships', scholarshipsRoute);
app.use('/password', passwordRoute);

app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
})
