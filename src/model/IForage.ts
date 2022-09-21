import {ICompteur} from "./ICompteur";

export interface IForage{
  id?: number | null | undefined;
  nomSite?: string | null | undefined;
  longitude?: number | null | undefined;
  latitude?: number | null | undefined;
  dateInstallation?: Date | null | undefined;
  profondeurForage?: number | null | undefined;
  hauteur?: number | null | undefined;
  capacite?: number | null | undefined;
  hauteurSousRadier?: number | null | undefined;
  typeParatonerre?: string | null | undefined;
  typeReservoir?: string | null | undefined;
  capaciteReservoir?: number | null | undefined;
  compteurs?: ICompteur[];
}
