import {ICompteur} from "./ICompteur";

export interface IAbonnement{
  id?: number | null | undefined;
  libelle?: string | null | undefined;
  prix_unitaire?: number | null | undefined;
  compteurs?: ICompteur[];
}
