import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IFacture} from "../../../model/IFacture";

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  host = environment.host
  url = "factures/";

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<IFacture> {
    return this.http.get<IFacture>(this.host + this.url)
  }

  createFacture(facture: IFacture): Observable<IFacture>{
    return this.http.post<IFacture>(this.host + this.url, facture, {
      headers: {
        'Authorization': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }
}
