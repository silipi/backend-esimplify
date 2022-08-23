import { NextFunction, Request, Response } from 'express';

import { ROLES_WEIGHTS, ROLES } from '../constants/roles';
import authentication from './authentication';

type Role = keyof typeof ROLES;

const authorization =
  (role: Role) => (req: Request, res: Response, next: NextFunction) => {
    authentication(req, res, () => {
      const userRole = req.user.role; // client, provider or admin
      const userRoleWeight = ROLES_WEIGHTS[userRole];
      const routeRoleWeight = ROLES_WEIGHTS[role];

      if (role === 'CLIENT' && userRole !== 'CLIENT') {
        // only clients can access client routes
        return res.status(401).json({
          message:
            'Unauthorized, you are logged in as a provider or admin trying to access the client route',
        });
      }

      if (userRoleWeight >= routeRoleWeight) {
        return next();
      }

      return res.status(401).json({
        message: 'Unauthorized, you are not authorized to access this route',
      });
    });
  };

export default authorization;
