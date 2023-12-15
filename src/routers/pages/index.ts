import express from 'express';

export const usePages = (app: express.Express) => {
    app.get('/', (req, res) => {
        res.render('index');
    });
}