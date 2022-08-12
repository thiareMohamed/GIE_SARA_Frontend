import {ICompteur} from "./ICompteur";

export interface IVillage{
  id?: number | null | undefined;
  nom?: string | null | undefined;
  commune?: number | null | undefined;
  compteurs?: ICompteur[];
}
