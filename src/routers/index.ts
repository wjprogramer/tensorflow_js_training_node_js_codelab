import express from 'express';
import { getMainRouter } from './main_router';

export * from './pages';

export const getRouters = () => {
    const routers = express.Router();

    routers.use('/api/main', getMainRouter());

    return routers;
}