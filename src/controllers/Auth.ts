import { Request, Response } from 'express';
import AuthService from '../services/Auth';

const AuthController = () => {
  const _service = AuthService();

  const loginAdmin = async (req: Request, res: Response) => {
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

      return res.status(401).json({
        message: 'Unauthorized, password incorrect',
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  return { loginAdmin };
};

export default AuthController;
