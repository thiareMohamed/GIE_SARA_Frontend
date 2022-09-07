import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IClient} from "../../../model/IClient";
import {Observable} from "rxjs";


@Injectable({
  providedIn: "root"
})
export class ClientService{
  host = environment.host
  url = "clients/";

  constructor(private http: HttpClient) {
  }

  public getClients(): Observable<IClient>{
    return this.http.get(this.host + this.url)
  }

  public showClient(id: number): Observable<IClient>{
    return this.http.get(this.host + this.url + id)
  }

  public addClient(client: IClient): Observable<IClient> {
    return this.http.post<any>(this.host + this.url, client, {
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  public deleteClient(id: number){
    return this.http.delete(this.host + this.url + id)
  }

  public editClient(client: IClient, id: number): Observable<IClient>{
    return this.http.put(this.host + this.url + id, client, {
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  public getClientsByNom(nom: any): Observable<IClient>{
    return this.http.get(this.host + this.url + "search/" + nom)
  }
}
