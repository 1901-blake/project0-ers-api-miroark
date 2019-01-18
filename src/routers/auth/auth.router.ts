import express from 'express';

export const authRouter = express.Router();

authRouter.post('/login', (req, res) => {
  // if (req.body.username === 'blake' && req.body.password === 'password'){
  //   res.json({
  //     username : req.body.username,
  //     role : 'admin'
  //   });
  // }//endif
});
