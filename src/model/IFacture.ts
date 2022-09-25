import {ICompteur} from "./ICompteur";

export interface IFacture{
  code?: number | null | undefined;
  dateDernierReleve?: Date;
  dateLimitePaiment?: Date;
  ancienIndex?: number | null | undefined;
  nouvelIndex?: number | null | undefined;
  statut?: boolean | null | undefined;
  compteur?: ICompteur;
}
