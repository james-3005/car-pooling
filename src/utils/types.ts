export enum RoleEnum {
  customer = "USER",
  admin = "ADMIN",
}

export interface IForm {
  validate: () => boolean;
  reset: () => void;
  resetValidation: () => void;
}
