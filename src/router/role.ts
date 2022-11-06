import { ROLE_ENUMS, SCREEN } from "@/utils/auth.const";
export const USER_ROLES = {
  [ROLE_ENUMS.ADMIN.ROLE_CODE]: {
    NAME: ROLE_ENUMS.ADMIN.ROLE_CODE,
    ROUTERS: [SCREEN.HOME.NAME],
  },
};

export function checkRole(routeName: string, rolesUser: string): boolean {
  if (!rolesUser) {
    return false;
  }
  return (
    USER_ROLES[rolesUser] && USER_ROLES[rolesUser].ROUTERS.includes(routeName)
  );
}
