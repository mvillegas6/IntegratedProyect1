import express from 'express';
import { chartControllers } from '../controllers/analitycs';
const Router = express.Router();

export const analyticRouter = Router.get('/', chartControllers.getCharts);
