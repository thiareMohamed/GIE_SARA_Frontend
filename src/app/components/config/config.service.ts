import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IVillage} from "../../../model/IVillage";
import {IForage} from "../../../model/IForage";
import {IAbonnement} from "../../../model/IAbonnement";

@Injectable({
  providedIn: "root"
})
export class ConfigService {
  host = environment.host
  urlVillage = "/villages/";
  urlForage = "/forages/";
  urlAbonnement = "/abonnements/";

  constructor(private http: HttpClient) {
  }

  getVillages(){
    return this.http.get(this.host + this.urlVillage)
  }

  findVillage(id: number){
    return this.http.get<IVillage>(this.host + this.urlVillage + id)
  }

  createVillage(village: IVillage){
    return this.http.post(this.host + this.urlVillage , village, {
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  updateVillage(village: IVillage, id: number){
    return this.http.put(this.host + this.urlVillage + id , village, {
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  deleteVillage(id: number){
    return this.http.delete(this.host + this.urlVillage + id)
  }





  // Forage

  getForages(){
    return this.http.get(this.host + this.urlForage)
  }

  findForage(id: number){
    return this.http.get<IForage>(this.host + this.urlForage + id)
  }

  createForage(forage: IForage){
    return this.http.post<any>(this.host + this.urlForage , forage, {
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  updateForage(forage: IForage, id: number){
    return this.http.put(this.host + this.urlForage + id , forage, {
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  deleteForage(id: number){
    return this.http.delete(this.host + this.urlForage + id)
  }




  // Abonnement

  getAbonnements(){
    return this.http.get(this.host + this.urlAbonnement)
  }

  findAbonnement(id: number){
    return this.http.get<IAbonnement>(this.host + this.urlAbonnement + id)
  }

  createAbonnement(abonnement: IAbonnement){
    return this.http.post<any>(this.host + this.urlAbonnement , abonnement, {
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  updateAbonnement(abonnement: IAbonnement, id: number){
    return this.http.put(this.host + this.urlAbonnement + id , abonnement, {
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  deleteAbonnement(id: number){
    return this.http.delete(this.host + this.urlAbonnement + id)
  }
}
