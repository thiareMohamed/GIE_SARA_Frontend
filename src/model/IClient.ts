import {ICompteur} from "./ICompteur";

export interface IClient{
  id?: number | null | undefined;
  prenom?: string | null | undefined;
  nom?: string | null | undefined;
  date_naissance?: string | null | undefined;
  lieu_naissance?: string | null | undefined;
  sexe?: string | null | undefined;
  numero_telephone?: string | null | undefined;
  numero_cni?: string | null | undefined;
  compteurs?: ICompteur[];
}
