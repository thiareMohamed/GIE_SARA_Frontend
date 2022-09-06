export interface IUtilisateur{
  id?: number | null | undefined;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  login?: string | null | undefined;
  email?: string | null | undefined;
  password?: string | null | undefined;
  authorities?: any[];
}
