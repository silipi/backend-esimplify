import { NextFunction, Request, Response } from 'express';

import { ROLES_WEIGHTS, ROLES } from '@/constants/roles';
import authentication from './authentication';

type Role = keyof typeof ROLES;

/**
 * Authorization middleware to handle protected routes based on the user's role.
 * @param {Role} role The minimum role required to access this route:
 * - ADMIN: the maximum route protection, only admins can access;
 * - PROVIDER: providers and admins can access;
 * - CLIENT_ONLY: only clients can access, useful for routes of payments;
 * - ALL: all users can access the route, it's just authentication;
 */
const authorization =
  (role: Role) => (req: Request, res: Response, next: NextFunction) => {
    authentication(req, res, () => {
      const userRole = req.user.role; // client, provider or admin
      const userRoleWeight = ROLES_WEIGHTS[userRole];
      const routeRoleWeight = ROLES_WEIGHTS[ROLES[role]];

      if (role === 'CLIENT_ONLY' && userRole !== 'CLIENT_ONLY') {
        // only clients can access client routes
        return res.status(401).json({
          message:
            'Unauthorized, you are logged in as a provider or admin trying to access the client route',
        });
      }

      console.log({
        userRoleWeight,
        routeRoleWeight,
        role,
        ROLES_WEIGHTS,
        userRole,
      });

      if (userRoleWeight >= routeRoleWeight) {
        return next();
      }

      return res.status(401).json({
        message: 'Unauthorized, you are not authorized to access this route',
      });
    });
  };

export default authorization;
