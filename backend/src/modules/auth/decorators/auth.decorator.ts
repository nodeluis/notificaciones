import { applyDecorators, UseGuards } from '@nestjs/common';
// import { ACGuard, Role, UseRoles } from 'nest-access-control';
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

export function Auth(/*...roles: Role[]*/) {
  return applyDecorators(
    UseGuards(JwtAuthGuard/*,ACGuard*/),
    //UseRoles(...roles),
  );
}
