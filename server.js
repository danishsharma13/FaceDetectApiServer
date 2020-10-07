import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './control/register.js';
import handleSignin from './control/signin.js';
import handleProfile from './control/profile.js';
import handleImage, { handleApiCall } from './control/image.js';


const db = knex({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
	db.select('*').from('users')
	.then(data => {
		res.json(data);
	})
});

app.post('/signin', handleSignin(db,bcrypt));

app.post('/register', handleRegister(db,bcrypt));

app.get('/profile/:id', handleProfile(db));

app.put('/image', handleImage(db));
app.post('/imageurl', handleApiCall);

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running, better catch it on ${process.env.PORT}`);
});