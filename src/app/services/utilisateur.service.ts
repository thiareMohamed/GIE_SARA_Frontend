import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

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

  public addUtilisateur(utilisateur: any){
    this.http.post(this.host + "/utilisateurs", utilisateur, {
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      },
    }).subscribe(response => {
      return response;
    })
  }
}
