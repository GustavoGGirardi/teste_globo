import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import databaseConfig from './config/database';
import cors from 'cors'

class App {
  constructor() {
    this.server = express();

    this.cors()
    this.database();
    this.middlewares();
    this.routes();
  }

  cors() {
    this.server.use(cors());
  }

  database() {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    mongoose.Promise = global.Promise;

    mongoose.connection.on('error', (error) => {
      console.error(`error: ${error.message}`);
    });
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
