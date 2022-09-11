import jwt from 'jsonwebtoken';
import { ROLES } from '@/constants/roles';
import AppError from '@/base/AppError';

const AuthService = () => {
  const loginAdmin = async (username: string, password: string) => {
    const admins = JSON.parse(process.env.ADMINS || '[]');

    if (admins.length === 0) {
      throw new AppError(500, 'ADMIN_ADMINS_NOT_SET');
    }

    const adminExists = admins.find(
      (admin: any) => admin.username === username && admin.password === password
    );

    if (adminExists) {
      const token = jwt.sign(
        { username, role: ROLES.ADMIN },
        process.env.JWT_SECRET || '',
        {
          expiresIn: '1d',
        }
      );

      return token;
    }

    return null;
  };

  const checkAdmin = async (token: string) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '');

      return decoded;
    } catch (error: any) {
      throw new AppError(401, 'ADMIN_LOGIN_NOT_AUTHORIZED');
    }
  };

  return { loginAdmin, checkAdmin };
};

export default AuthService;
