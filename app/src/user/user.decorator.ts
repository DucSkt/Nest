import { createParamDecorator, Logger } from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
   // Logger.log(req.user, "8888");
  // Logger.log(req, "999");
  return data ? req.user[data] : req.user;
});