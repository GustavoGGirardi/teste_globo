import { Router } from 'express';

import handle from 'express-async-handler';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SeesionController from './app/controllers/SessionController';
import PostController from './app/controllers/PostController';

const routes = Router();

// Rotas Desprotegidas

// criar uma session
routes.post('/sessions', handle(SeesionController.store));
// criar um usuario
routes.post('/users', handle(UserController.store));

// Rotas Protegidas

// a partir deste middleware é nescessario estar autenticado para acessar

routes.use(authMiddleware);
// Rotas Usuarios

// listar usuarios
routes.get('/user', handle(UserController.index));
// listar usuario atraves de seu Id
routes.get('/user/:id', handle(UserController.show));
// dar update no usuario atraves do seu id
routes.put('/user/:id', handle(UserController.update));
// deletar usuario
routes.delete('/user/:id', handle(UserController.destroy));

// Rotas Posts

// listar Posts

routes.post('/post', handle(PostController.store));

routes.get('/post', handle(PostController.index));
// listar post
routes.get('/post/:id', handle(PostController.show));
// dar update
routes.put('/post/:id', handle(PostController.update));
// deletar post
routes.delete('/post/:id', handle(PostController.destroy));

export default routes;
