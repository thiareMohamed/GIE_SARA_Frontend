import {ICompteur} from "./ICompteur";
import {ICommune} from "./ICommune";

export interface IVillage{
  id?: number | null | undefined;
  nom?: string | null | undefined;
  commune: ICommune;
  compteurs?: ICompteur[];
}
