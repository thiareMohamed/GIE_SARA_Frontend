import {ICompteur} from "./ICompteur";

export interface IForage{
  id?: number | null | undefined;
  nom_site?: string | null | undefined;
  longitude?: number | null | undefined;
  latitude?: number | null | undefined;
  date_installation?: Date | null | undefined;
  profondeur_forage?: number | null | undefined;
  hauteur?: number | null | undefined;
  capacite?: number | null | undefined;
  hauteur_sous_radier?: number | null | undefined;
  type_paratonerre?: string | null | undefined;
  type_reservoir?: string | null | undefined;
  capacite_reservoir?: number | null | undefined;
  compteurs?: ICompteur[];
}
