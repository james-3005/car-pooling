export enum RoleEnum {
  customer = 0,
  driver = 1,
}
export interface IForm {
  validate: () => boolean;
  reset: () => void;
  resetValidation: () => void;
}
