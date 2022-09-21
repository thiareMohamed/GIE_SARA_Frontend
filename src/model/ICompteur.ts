import {IClient} from "./IClient";
import {IForage} from "./IForage";
import {IVillage} from "./IVillage";
import {IAbonnement} from "./IAbonnement";

export interface ICompteur{
  id?: number | null | undefined;
  typeCompteur?: string | null | undefined;
  dateAbonnement?: Date | null | undefined;
  marque?: string | null | undefined;
  statut?: boolean | null | undefined;
  forage?: IForage;
  village?: IVillage;
  abonnement?: IAbonnement;
  client?: IClient;
}
