import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IUtilisateur} from "../../model/IUtilisateur";
import {IRoleEmail} from "../../model/IRoleEmail";


@Injectable({
  providedIn: "root"
})
export class UtilisateurService{
  host = environment.host

  constructor(private http: HttpClient) {
  }

  public getUtilisateurs(){
    return this.http.get(this.host + "/utilisateurs")
  }

  public addUtilisateur(utilisateur: IUtilisateur){
    return this.http.post<any>(this.host + "/utilisateurs", utilisateur, {
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  public deleteUtilisateur(id: number){
    return this.http.delete(this.host + "/utilisateurs/" + id)
  }

  public removeRole(roleEmail: IRoleEmail) {
    return this.http.put(this.host + "/removeRole", roleEmail)
  }
}
