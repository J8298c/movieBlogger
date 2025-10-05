import express from 'express';
import { getMovies, getSingleMovie } from '../controllers/movies.controler';

export const movieRouter = express.Router();

movieRouter.get('/', getMovies)
movieRouter.get('/:id', getSingleMovie)