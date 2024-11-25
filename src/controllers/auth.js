import { ONE_DAY } from '../constants/index.js';
import { registerUser } from '../services/auth.js';
import { refreshUsersSession } from '../services/auth.js';
import { loginUser } from '../services/auth.js';
import { logoutUser } from '../services/auth.js';
export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.starus(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

const setUpSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const loginUserController = async (req, res) => {
  await loginUser(req.body);
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshUsersSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookie.sessionId,
    refreshToken: req.cookie.refreshToken,
  });

  setUpSession(res, session);

  res.json({
    status: 200,
    message: 'Succesfully refreshed a token!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
