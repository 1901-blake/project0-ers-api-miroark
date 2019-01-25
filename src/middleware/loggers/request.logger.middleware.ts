import express from 'express';

export default function requestLogger (req: express.Request, res: express.Response, next: Function) {// Logger
    console.log(`${req.method} Request recieved from ${req.ips} for ${req.path}`);
    next();
  }