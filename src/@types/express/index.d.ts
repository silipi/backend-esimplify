export {};

declare global {
  namespace Express {
    interface Request {
      user: {
        username: string;
        role: string;
      };
    }
  }
}
