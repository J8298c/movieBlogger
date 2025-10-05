import express from 'express';

export const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
  try {
    res.send('Signup')
  } catch (err) {
    console.error(err)
  }
})


authRouter.post('/login', async (req, res) => {
  try {
    res.send('Login')
  } catch (err) {
    console.error(err)
  }
})