import {ICompteur} from "./ICompteur";

export interface IClient{
  id?: number | null | undefined;
  prenom?: string | null | undefined;
  nom?: string | null | undefined;
  dateNaissance?: string | null | undefined;
  lieuNaissance?: string | null | undefined;
  sexe?: string | null | undefined;
  numeroTelephone?: string | null | undefined;
  numeroCni?: string | null | undefined;
  compteurs?: ICompteur[];
}
