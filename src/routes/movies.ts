import express from 'express';

export const movieRouter = express.Router();

movieRouter.get('/', async (req, res) => {
  try {
    res.send('Get Movies')
  } catch (err) {
    console.error(err)
  }
})

movieRouter.get('/:id', async (req, res) => {
  try {
    res.send(`Get Movie ${req.params.id}`)
  } catch (err) {
    console.error(err)
  }
})