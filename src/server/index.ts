import express from 'express';
import { json as jsonBodyParser } from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { getRouters, usePages } from '@src/routers';
import ejsEngine from 'ejs-locals';

const runServer = () => {
    const app: express.Express = express();

    // pages base settings
    app.engine('ejs', ejsEngine);
    app.set('views', './src/views');
    app.set('view engine', 'ejs');

    // pages
    usePages(app);

    // api base middleware
    app.use(jsonBodyParser());
    app.use(cors());
    app.use(cookieParser());

    // api routers
    app.use(getRouters());

    // Run
    const serverPort = 9487;
    app.listen(serverPort);
    console.log(`Server listen: http://localhost:${serverPort} ...`);

}

export { runServer }