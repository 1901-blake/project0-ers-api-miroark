import express from 'express';

export default async function accessControl (req: express.Request, res: express.Response, next: express.NextFunction) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', String(req.headers.origin));
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-access-token');    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
}