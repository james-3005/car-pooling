import { RoleEnum } from "@/utils/types";

export const USER_ROLES = {
  [RoleEnum.admin]: ["HomeClient", "Info", "MapClient", "ClusterClient"],
  [RoleEnum.customer]: ["HomeAdmin", "ClusterAdmin"],
};

export function checkRole(routeName: string, rolesUser: RoleEnum): boolean {
  return USER_ROLES[rolesUser] && USER_ROLES[rolesUser].includes(routeName);
}
