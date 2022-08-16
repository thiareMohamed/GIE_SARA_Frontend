import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BashboardComponent } from './pages/bashboard/bashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ClientComponent } from './components/client/client.component';
import { UtilisateurComponent } from './components/utilisateur/utilisateur.component';
import { FacturationComponent } from './components/facturation/facturation.component';
import { CompteurComponent } from './components/compteur/compteur.component';
import {RouterModule, Routes} from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConfigComponent } from './components/config/config.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BashboardComponent,
    HomeComponent,
    ClientComponent,
    UtilisateurComponent,
    FacturationComponent,
    CompteurComponent,
    ConfigComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: "", component: HomeComponent},
      {path: "accueil", component: HomeComponent},
      {path: "accueil", component: HomeComponent},
      {path: "client", component: ClientComponent},
      {path: "utilisateur", component: UtilisateurComponent},
      {path: "facture", component: FacturationComponent},
      {path: "compteur", component: CompteurComponent},
      {path: "login", component: LoginComponent},
      {path: "config", component: ConfigComponent}

    ]),
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
