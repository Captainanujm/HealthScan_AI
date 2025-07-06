import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error('JWT secret key missing in .env');
}
export function generateToken(email) {
  if (!email) {
    throw new Error('User object with email is required to generate token');
  }

  const payload = { email};
  const options = { expiresIn: '1h' }; // Token valid for 1 hour

  return jsonwebtoken.sign(payload, SECRET_KEY, options);
}