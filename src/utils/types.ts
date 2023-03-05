export enum RoleEnum {
  customer = 0,
  admin = 1,
}

export interface IForm {
  validate: () => boolean;
  reset: () => void;
  resetValidation: () => void;
}
