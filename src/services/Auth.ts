import jwt from 'jsonwebtoken';
import { ROLES } from '../constants/roles';

const AuthService = () => {
  const loginAdmin = async (username: string, password: string) => {
    const admins = JSON.parse(process.env.ADMINS || '[]');

    if (admins.length === 0) {
      throw new Error('No admins registered on env variable ADMINS');
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

  return { loginAdmin };
};

export default AuthService;
