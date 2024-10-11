import jwt from 'jsonwebtoken';

export function userLoggedIn(req: any, res: any, next: any) {
  const token = req.cookies ? req.cookies.token : null;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, process.env.SECRET || "", (err: any, decoded: any) => {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.id = decoded.id;
				console.log("req.id", req.id);

        next();
      }
    });
  }
}