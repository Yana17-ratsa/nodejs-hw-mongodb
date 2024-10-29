import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { getContactById, getContacts } from './services/contacts.js';

const PORT = Number(env('PORT', 4000));

const setupServer = () => {
  const app = express();

  app.use(express.json());

  app.use(cors());

  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);

  app.get('/contacts', async (_, res) => {
    const data = await getContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { _id } = req.params;
    const data = await getContactById(_id);

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Contact with id=${_id} not found!`,
      });
    }

    res.json({
      status: 200,
      message: 'Successfully found contact!',
      data,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

export default setupServer;
