import express from 'express';
import axios from 'axios';
import FormData from 'form-data';
import { asyncHandler } from '@src/utils';
import multer from "multer";
import UploadHelper from "@src/helpers/upload_helper";
import path from "path";
import {PromiseWrapper} from "@src/models";
import * as fs from "fs";

export const getMainRouter = () => {
    const mainRouter = express.Router();

    mainRouter.route('/hello')
        .get((_, res) => {
            res.json({ msg: 'hello world' });
        })

    mainRouter.route('/redirect')
        .get((_, res) => {
            res.redirect('https://www.google.com');
        })

    mainRouter.route('/send-html')
        .get((_, res) => {
            res.set('Content-Type', 'text/html');
            res.send(Buffer.from('<h2>Hello ~</h2>'));
        })

    mainRouter.route('/order')
        .get(asyncHandler(async (_, res) => {
            // const { env } = getGlobal();
            // const form = new FormData();
            // form.append('MerchantID', env.M_MERCHANT_ID);
            // form.append('file', fs.createReadStream('/pictures/avatar.png'))
            // const ecPayRes = await axios.post(`${env.EC_PAY_DOMAIN}/Cashier/AioCheckOut/V5`);
            res.json({ msg: 'Hi' });
        }));

    return mainRouter;
}