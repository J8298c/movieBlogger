import { type Request, type Response } from "express";

export const postComment = async (req: Request, res: Response) => {
   try {
    res.send('Comments')
  } catch (err) {
    console.error(err)
  }
}

export const getMovieComment = async (req: Request, res: Response) => {
  try {
    res.send(`Comments ${req.params.movieId}`)
  } catch (err) {
    console.error(err)
  }
}

export const flagComment = async (req: Request, res: Response) => {
   try {
    res.send('Comments Post')
  } catch (err) {
    console.error(err)
  }
}

export const deleteComment = async (req: Request, res: Response) => {
   try {
    res.send('Delete a comment')
  } catch (err) {
    console.error(err)
  }
}