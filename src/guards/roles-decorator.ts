import { SetMetadata } from "@nestjs/common"

export const ROLES_KEY = 'roles';

export const Roles = (level: number) => SetMetadata(ROLES_KEY, level)