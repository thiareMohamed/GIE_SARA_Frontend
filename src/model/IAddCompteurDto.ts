export interface IAddCompteurDto{
  id?: number | null | undefined;
  typeCompteur?: string | null | undefined;
  dateAbonnement?: Date | null | undefined;
  marque?: string | null | undefined;
  statut?: boolean;
  idForage?: number | null | undefined;
  idVillage?: number | null | undefined;
  idAbonnement?: number | null | undefined;
  idClient?: number | null | undefined;
}
