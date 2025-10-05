import { type Request, type Response, type NextFunction } from "express";

export const getMovies = async (req: Request, res: Response) => {
  try {
    res.send('Get Movies')
  } catch (err) {
    console.error(err)
  }
}

export const getSingleMovie = async (req: Request, res: Response) => {
  try {
    res.send(`Get Movie ${req.params.id}`)
  } catch (err) {
    console.error(err)
  }
}