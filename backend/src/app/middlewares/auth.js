import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // busca no header da requisição o campo authorization
  const authHeader = req.headers.authorization;

  // caso nao exista o campo retorna status 401
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não existe' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token Invalido' });
  }
};
