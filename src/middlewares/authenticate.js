import createHttpError from 'http-errors';

import { sessionCollection } from '../db/session.js';
import { UsersCollection } from '../db/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError(401, 'Please? provide authrization header!'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await sessionCollection.findOne({
    accessToken: token,
  });

  if (!session) {
    next(createHttpError(401, 'Sesssion not found!'));
  }

  const isAccessTokenExpired =
    new Date() > new Date(req.session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
  }

  const user = UsersCollection.findById(session.userId);

  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = user;

  next();
};
