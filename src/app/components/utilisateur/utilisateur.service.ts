import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IUtilisateur} from "../../../model/IUtilisateur";
import {IRoleEmail} from "../../../model/IRoleEmail";
import {FormControl, ɵValue} from "@angular/forms";


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

  public showUtilisateur(id: number){
    return this.http.get(this.host + "/utilisateur/" + id)
  }

  public addUtilisateur(utilisateur: IUtilisateur, libelle: ɵValue<FormControl<string | null>> | undefined) {
    return this.http.post<any>(this.host + "/utilisateurs/" + libelle, utilisateur, {
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  public deleteUtilisateur(id: number){
    return this.http.delete(this.host + "/utilisateurs/" + id)
  }

  public EditUtilisateur(utilisateur: IUtilisateur, id: number){
    return this.http.patch(this.host + "/utilisateurs/update/" + id, utilisateur, {
        headers: {
          'Authorization': 'application/json',
          'Content-Type': 'application/json',
        }
      })
  }

  // public removeRole(roleEmail: IRoleEmail) {
  //   return this.http.put(this.host + "/removeRole", roleEmail)
  // }
}
