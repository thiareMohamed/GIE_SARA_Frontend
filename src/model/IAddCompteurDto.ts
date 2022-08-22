export interface IAddCompteurDto{
  id?: number | null | undefined;
  type_compteur?: string | null | undefined;
  date_abonnement?: Date | null | undefined;
  marque_compteur?: string | null | undefined;
  statut?: boolean;
  idForage?: number | null | undefined;
  idVillage?: number | null | undefined;
  idAbonnement?: number | null | undefined;
  idClient?: number | null | undefined;
}
