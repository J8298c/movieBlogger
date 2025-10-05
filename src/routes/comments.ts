import express from 'express';

export const commentRouter = express.Router();

commentRouter.get('/', async (req, res) => {
  try {
    res.send('Comments')
  } catch (err) {
    console.error(err)
  }
})

commentRouter.get('/:movieId', async (req, res) => {
  try {
    res.send(`Comments ${req.params.movieId}`)
  } catch (err) {
    console.error(err)
  }
})

commentRouter.post('/:id/flag', async(req, res) => {
  try {
    res.send('Comments Post')
  } catch (err) {
    console.error(err)
  }
})

commentRouter.delete('/:id', async (req, res) => {
  try {
    res.send('Delete a comment')
  } catch (err) {
    console.error(err)
  }
})

