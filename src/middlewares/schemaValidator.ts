import { NextFunction, Request, Response } from 'express';
import { Schema, ValidationError } from 'joi';

type Schemas = {
  [key in 'params' | 'query' | 'body']?: Schema;
};

const schemaValidator =
  ({ params, query, body }: Schemas) =>
  (req: Request, res: Response, next: NextFunction) => {
    const objects = [
      { key: 'params', schema: params },
      { key: 'query', schema: query },
      { key: 'body', schema: body },
    ];
    const errors: ValidationError[] = [];

    objects.forEach((object) => {
      if (object.schema) {
        // @ts-ignore
        const { error } = object.schema.validate(req[object.key]);

        if (error) {
          errors.push(error);
        }
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({
        error: errors.map((error) => error.message).join(', '),
      });
    }

    next();
  };

export default schemaValidator;
