import {ICompteur} from "./ICompteur";

export interface IAbonnement{
  id?: number | null | undefined;
  libelle?: string | null | undefined;
  prixUnitaire?: number | null | undefined;
  compteurs?: ICompteur[];
}
