import { NextFunction, Request, Response } from 'express';
import AppError from '@/base/AppError';
import AuthService from '@/services/Auth';

const AuthController = () => {
  const _service = AuthService();

  const loginAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username, password } = req.body;

    try {
      const token = await _service.loginAdmin(username, password);

      if (token) {
        return res
          .cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          })
          .send();
      }

      throw new AppError(401, 'ADMIN_LOGIN_NOT_AUTHORIZED');
    } catch (error: any) {
      next(error);
    }
  };

  const logoutAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.clearCookie('token').send();
    } catch (error: any) {
      next(error);
    }
  };

  const checkAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token } = req.cookies;

      if (!token) {
        throw new AppError(401, 'ADMIN_LOGIN_NOT_AUTHORIZED');
      }

      const decoded = await _service.checkAdmin(token);

      if (decoded) {
        return res.status(200).json({
          status: 'success',
          data: decoded,
        });
      }

      throw new AppError(401, 'ADMIN_LOGIN_NOT_AUTHORIZED');
    } catch (error: any) {
      next(error);
    }
  };

  return { loginAdmin, logoutAdmin, checkAdmin };
};

export default AuthController;
