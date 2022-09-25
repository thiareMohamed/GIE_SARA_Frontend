import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ICompteur} from "../../../model/ICompteur";
import {Observable} from "rxjs";
import {IClient} from "../../../model/IClient";
import {IAddCompteurDto} from "../../../model/IAddCompteurDto";

@Injectable({
  providedIn: "root"
})
export class CompteurService {
  host = environment.host
  url = "compteurs/";

  constructor(private http: HttpClient) {
  }

  public createCompteur(compteur: ICompteur): Observable<ICompteur>{
    return this.http.post<ICompteur>(this.host + this.url, compteur,{
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  public getCompteurs(): Observable<ICompteur>{
    return this.http.get(this.host + this.url)
  }

  public deleteCompteur(id: number){
    return this.http.delete(this.host + this.url + id)
  }

  public setStatus(id: number) {
    return this.http.get(`${this.host + this.url}set-status/${id}`)
  }

  public showCompteur(id: number) {
    return this.http.get(this.host + this.url + id)
  }

  public editCompteur(id: number, compteur: IAddCompteurDto) {
    return this.http.put<ICompteur>(this.host + this.url + id, compteur,{
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }
}
