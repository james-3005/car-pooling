import { SCREEN } from "@/utils/screen";
import { RoleEnum } from "@/utils/types";

export const USER_ROLES = {
  [RoleEnum.driver]: [SCREEN.HOME.NAME, SCREEN.INFO.NAME],
  [RoleEnum.customer]: [SCREEN.HOME.NAME, SCREEN.INFO.NAME],
};

export function checkRole(routeName: string, rolesUser: RoleEnum): boolean {
  return USER_ROLES[rolesUser] && USER_ROLES[rolesUser].includes(routeName);
}
