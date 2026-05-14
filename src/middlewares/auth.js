import TokenManager from '../security/token-manager.js';
import UserRepositories from '../services/users/repositories/user-repositories.js';
import { AuthenticationError } from '../exceptions/index.js';

const authMiddleware = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return next(new AuthenticationError('Token tidak ditemukan'));
    }

    const token = authHeader.split(' ')[1];
    const { id } = TokenManager.verifyAccessToken(token);

    const user = await UserRepositories.findById(id);
    if (!user) return next(new AuthenticationError('User tidak ditemukan'));

    req.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
};

export default authMiddleware;