const ROLES = {
  ADMIN: 'admin',
  PROVIDER: 'provider',
  CLIENT: 'client',
};

const ROLES_WEIGHTS = {
  [ROLES.ADMIN]: 3,
  [ROLES.PROVIDER]: 2,
  [ROLES.CLIENT]: 1,
};

export { ROLES, ROLES_WEIGHTS };
