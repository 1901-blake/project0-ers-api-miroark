import express from 'express';

export default async function accessControl (req: express.Request, res: express.Response, next: express.NextFunction) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', String(req.headers.origin));
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
}
