import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IVillage} from "../../../model/IVillage";
import {IForage} from "../../../model/IForage";
import {IAbonnement} from "../../../model/IAbonnement";
import {Observable} from "rxjs";
import {IClient} from "../../../model/IClient";

@Injectable({
  providedIn: "root"
})
export class ConfigService {
  host = environment.host
  urlVillage = "villages/";
  urlForage = "forages/";
  urlAbonnement = "abonnements/";

  constructor(private http: HttpClient) {
  }

  getVillages(): Observable<IVillage[]>{
    return this.http.get<IVillage[]>(this.host + this.urlVillage)
  }

  findVillage(id: number): Observable<IVillage>{
    return this.http.get<IVillage>(this.host + this.urlVillage + id)
  }

  createVillage(village: IVillage): Observable<IVillage>{
    return this.http.post<IVillage>(this.host + this.urlVillage , village, {
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  updateVillage(village: IVillage, id: number): Observable<IVillage>{
    return this.http.put<IVillage>(this.host + this.urlVillage + id , village, {
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

  getForages(): Observable<IForage[]>{
    return this.http.get<IForage[]>(this.host + this.urlForage)
  }

  findForage(id: number){
    return this.http.get<IForage>(this.host + this.urlForage + id)
  }

  createForage(forage: IForage): Observable<IForage>{
    return this.http.post<IForage>(this.host + this.urlForage , forage, {
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  updateForage(forage: IForage, id: number): Observable<IForage>{
    return this.http.put<IForage>(this.host + this.urlForage + id , forage, {
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

  getAbonnements(): Observable<IAbonnement[]>{
    return this.http.get<IAbonnement[]>(this.host + this.urlAbonnement)
  }

  findAbonnement(id: number): Observable<IAbonnement>{
    return this.http.get<IAbonnement>(this.host + this.urlAbonnement + id)
  }

  createAbonnement(abonnement: IAbonnement): Observable<IAbonnement>{
    return this.http.post<IAbonnement>(this.host + this.urlAbonnement , abonnement, {
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  updateAbonnement(abonnement: IAbonnement, id: number): Observable<IAbonnement>{
    return this.http.put<IAbonnement>(this.host + this.urlAbonnement + id , abonnement, {
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
