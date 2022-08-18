import {IVillage} from "./IVillage";

export interface ICommune{
  id?: number | null | undefined;
  nom?: string | null | undefined;
  villages?: IVillage[]
}
