import jwt from 'jsonwebtoken';

export function withAuth(req: any, res: any, next: any) {
  const token = req.cookies ? req.cookies.token : null;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, process.env.SECRET || "", function(err: any, decoded: any) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req._id = decoded._id;
        next();
      }
    });
  }
}