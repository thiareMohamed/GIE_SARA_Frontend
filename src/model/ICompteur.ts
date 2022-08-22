import {IClient} from "./IClient";
import {IForage} from "./IForage";
import {IVillage} from "./IVillage";
import {IAbonnement} from "./IAbonnement";

export interface ICompteur{
  id?: number | null | undefined;
  type_compteur?: string | null | undefined;
  date_abonnement?: Date | null | undefined;
  marque_compteur?: string | null | undefined;
  statut?: boolean | null | undefined;
  forage?: IForage;
  village?: IVillage;
  abonnement?: IAbonnement;
  client?: IClient;
}
